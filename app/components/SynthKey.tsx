import type { Note } from "../lib/noteToHz";
import {useActiveNote} from "../hooks/useActiveNote"

interface SynthKeyProps {
  children: React.ReactNode;
  buttonNote: Note;
  note: Note | null;
  setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export default function SynthKey({ children, buttonNote, note, setNote }: SynthKeyProps) {
  const active = useActiveNote(buttonNote, note);
  const buttonClass = active ? "key-active" : "key";
  return (
    <button className={buttonClass} onClick={() => setNote(buttonNote)}>
      {children}
    </button>
  );
}
