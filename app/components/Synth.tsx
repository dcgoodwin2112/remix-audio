import { useWebAudioSynth } from "../hooks/useWebAudioSynth";
import SynthKey from "./SynthKey";

export default function Synth() {
  const [note, setNote] = useWebAudioSynth();
  return (
    <div>
      <SynthKey buttonNote="C4" {...{ note, setNote }}>
        C
      </SynthKey>
      <SynthKey buttonNote="C#4" {...{ note, setNote }}>
        C♯ / D♭
      </SynthKey>
      <SynthKey buttonNote="D4" {...{ note, setNote }}>
        D
      </SynthKey>
      <SynthKey buttonNote="D#4" {...{ note, setNote }}>
        D♯ / E♭
      </SynthKey>
      <SynthKey buttonNote="E4" {...{ note, setNote }}>
        E
      </SynthKey>
      <SynthKey buttonNote="F4" {...{ note, setNote }}>
        F
      </SynthKey>
      <SynthKey buttonNote="F#4" {...{ note, setNote }}>
        F♯ / G♭
      </SynthKey>
      <SynthKey buttonNote="G4" {...{ note, setNote }}>
        G
      </SynthKey>
      <SynthKey buttonNote="G#4" {...{ note, setNote }}>
        G♯ / A♭
      </SynthKey>
      <SynthKey buttonNote="A4" {...{ note, setNote }}>
        A
      </SynthKey>
      <SynthKey buttonNote="A#4" {...{ note, setNote }}>
        A♯ / B♭
      </SynthKey>
      <SynthKey buttonNote="B4" {...{ note, setNote }}>
        B
      </SynthKey>
      <SynthKey buttonNote="C5" {...{ note, setNote }}>
        C
      </SynthKey>
    </div>
  );
}
