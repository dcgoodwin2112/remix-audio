import { useState, useEffect } from "react";
import playSynth from "../lib/synth";
import type {Note} from "../lib/noteToHz"

export function useWebAudioSynth() {
  const [note, setNote] = useState<Note | null>(null);
  useEffect(() => {
    if (note) {
      playSynth({ note });
      setNote(null);
    }
  }, [note]);

  useEffect(() => {
    const getNoteFromKey = (key: string) => {
      switch (key) {
        case "a":
          return "C4";
        case "w":
          return "C#4";
        case "s":
          return "D4";
        case "e":
          return "D#4";
        case "d":
          return "E4";
        case "f":
          return "F4";
        case "t":
          return "F#4";
        case "g":
          return "G4";
        case "y":
          return "G#4";
        case "h":
          return "A4";
        case "u":
          return "A#4";
        case "j":
          return "B4";
        case "k":
          return "C5";
        default:
          return null;
      }
    };

    const listener = (e: KeyboardEvent) => {
      const key = getNoteFromKey(e.key);
      if (key) {
        setNote(key);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return [note, setNote] as const;
}