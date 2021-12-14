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

  async function createReverb() {
    const convolver = audioCtx.createConvolver();
    const response = await fetch("../assets/IRx1000_02C.wav");
    const arraybuffer = await response.arrayBuffer();
    convolver.buffer = await audioCtx.decodeAudioData(arraybuffer);
    return convolver;
  }

  const reverb = await createReverb();
  const reverbGain = audioCtx.createGain();
  reverbGain.gain.value = 0.1;
  reverb.connect(reverbGain);
  reverbGain.connect(audioCtx.destination);

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.connect(reverb);

  const postFilterGain = audioCtx.createGain();
  postFilterGain.gain.value = 0.9;
  filter.connect(postFilterGain);
  postFilterGain.connect(audioCtx.destination);

  const oscillators: OscillatorNode[] = [];

  // Oscillator 1
  const osc1Gain = audioCtx.createGain();
  osc1Gain.gain.value = 0.45;
  osc1Gain.connect(filter);

  const oscillator1 = audioCtx.createOscillator();
  oscillator1.type = "sawtooth";
  oscillator1.frequency.value = getNoteFrequency(note); // value in hertz
  oscillator1.connect(osc1Gain);
  oscillators.push(oscillator1);

  // Oscillator2
  const osc2Gain = audioCtx.createGain();
  osc2Gain.gain.value = 0.20;
  osc2Gain.connect(filter);

  const oscillator2 = audioCtx.createOscillator();
  oscillator2.type = "triangle";
  oscillator2.frequency.value = getOctaveFrequency(note, "down"); // value in hertz
  oscillator2.connect(osc2Gain);
  oscillators.push(oscillator2);

  //Oscillator3
  const osc3Gain = audioCtx.createGain();
  osc3Gain.gain.value = 0.20;
  osc3Gain.connect(filter);

  const oscillator3 = audioCtx.createOscillator();
  oscillator3.type = "square";
  oscillator3.frequency.value = getOctaveFrequency(note, "up"); // value in hertz
  oscillator3.connect(osc3Gain);
  oscillators.push(oscillator3);

  oscillators.forEach((osc) => {
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
  });
}
