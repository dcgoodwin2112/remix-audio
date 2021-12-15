import getNoteFrequency, { getOctaveFrequency, Note } from "./noteToHz";

interface Options {
  note?: Note;
  duration?: number;
}
// Hack to prevent a new AudioContext to be created on every note
let audioCtx: AudioContext;
export default async function playSynth({
  note = "C4",
  duration = 0.33,
}: Options) {
  if (!audioCtx) {
    audioCtx = new window.AudioContext();
  }

  // Reverb 🎹

  async function createReverb() {
    const convolver = audioCtx.createConvolver();
    const response = await fetch("../assets/IRx1000_02C.wav");
    const arraybuffer = await response.arrayBuffer();
    convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);
    return convolver;
  }

  const reverb = await createReverb();

  // Reverb Wet/Dry Mix 🎹
  
  // -- reverb gain
  const reverbGain = audioCtx.createGain();
  reverbGain.gain.value = 0.15;
  
  // -- post-filter gain
  const postFilterGain = audioCtx.createGain();
  postFilterGain.gain.value = 0.7;
  
  // Filter 🎹
  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 566;
  
  // Oscillator Gain 🎹
 
  // -- oscillator1 Gain
  const osc1Gain = audioCtx.createGain();
  osc1Gain.gain.value = 0.45;

  // -- oscillator2 Gain
  const osc2Gain = audioCtx.createGain();
  osc2Gain.gain.value = 0.20;

  // -- oscillator3 Gain
  const osc3Gain = audioCtx.createGain();
  osc3Gain.gain.value = 0.20;

  // Oscillators 🎹
  
  const oscillators: OscillatorNode[] = [];
  
  // -- oscillator 1
  const oscillator1 = audioCtx.createOscillator();
  oscillator1.type = "sawtooth";
  oscillator1.frequency.value = getNoteFrequency(note);
  oscillators.push(oscillator1);
  
   // -- oscillator2
  const oscillator2 = audioCtx.createOscillator();
  oscillator2.type = "triangle";
  oscillator2.frequency.value = getOctaveFrequency(note, "down");
  oscillators.push(oscillator2);
  
  // -- oscillator3
  const oscillator3 = audioCtx.createOscillator();
  oscillator3.type = "square";
  oscillator3.frequency.value = getOctaveFrequency(note, "up");
  oscillators.push(oscillator3);
  
  // Patch Bay 🎹

  // -- Filter Gain and Reverb to OUTPUT
  postFilterGain.connect(audioCtx.destination);
  reverb.connect(audioCtx.destination);

  // -- ReverbGain to  Reverb
  reverbGain.connect(reverb)

  // -- Filter Wet/Dry to Reverb and OUT
  filter.connect(reverbGain);
  filter.connect(postFilterGain);
  
  // -- oscillator Gain
  osc1Gain.connect(filter);
  osc3Gain.connect(filter);
  osc2Gain.connect(filter);
  
  // -- oscillators
  oscillator1.connect(osc1Gain);
  oscillator2.connect(osc2Gain);
  oscillator3.connect(osc3Gain);
  
  // PLAY SYNTH!
  oscillators.forEach((osc) => {
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
  });
}
