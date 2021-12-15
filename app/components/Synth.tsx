import { useWebAudioSynth } from "../hooks/useWebAudioSynth";
import SynthKey from "./SynthKey";

const synthKeys = [
  { buttonNote: "C4", label: "C" },
  { buttonNote: "C#4", label: "C♯ / D♭" },
  { buttonNote: "D4", label: "D" },
  { buttonNote: "D#4", label: "D♯ / E♭" },
  { buttonNote: "E4", label: "E" },
  { buttonNote: "F4", label: "F" },
  { buttonNote: "F#4", label: "F♯ / G♭" },
  { buttonNote: "G4", label: "G" },
  { buttonNote: "G#4", label: "G♯ / A♭" },
  { buttonNote: "A4", label: "A" },
  { buttonNote: "A#4", label: "A♯ / B♭" },
  { buttonNote: "B4", label: "B" },
  { buttonNote: "C5", label: "C" },
] as const;

export default function Synth() {
  const [note, setNote] = useWebAudioSynth();
  return (
    <div>
      {synthKeys.map(({ buttonNote, label }) => {
        return (
          <SynthKey {...{ buttonNote, note, setNote }}>
            {label}
          </SynthKey>
        );
      })}
    </div>
  );
}
