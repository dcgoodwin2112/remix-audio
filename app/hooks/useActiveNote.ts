import { useState, useEffect } from "react";
import type { Note } from "../lib/noteToHz";

export function useActiveNote(buttonNote: Note, note: Note | null) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (buttonNote === note && !active) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 100);
    }
  }, [note]);
  return active;
}
