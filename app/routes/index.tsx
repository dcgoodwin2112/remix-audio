import React from "react";
import type { MetaFunction } from "remix";
import { Note } from "../lib/noteToHz";
import { useWebAudioSynth } from "../hooks/useWebAudioSynth";
import { useActiveNote } from "../hooks/useActiveNote";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Synth",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const [note, setNote] = useWebAudioSynth();
  return (
    <div className="remix__page">
      <main>
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
      </main>
      <aside>
        Key Bindings
        <ul>
          <li>a = C</li>
          <li>w = C♯ / D♭</li>
          <li>s = D</li>
          <li>e = D♯ / E♭</li>
          <li>f = E</li>
          <li>g = F</li>
          <li>t = F♯ / G♭</li>
          <li>g = G</li>
          <li>y = G♯ / A♭</li>
          <li>h = A</li>
          <li>u = A♯ / B♭</li>
          <li>j = B</li>
          <li>k = C</li>
        </ul>
      </aside>
    </div>
  );
}

interface SynthKeyProps {
  children: React.ReactNode;
  buttonNote: Note;
  note: Note | null;
  setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

function SynthKey({ children, buttonNote, note, setNote }: SynthKeyProps) {
  const active = useActiveNote(buttonNote, note);
  const buttonClass = active ? "key-active" : "key";
  return (
    <button className={buttonClass} onClick={() => setNote(buttonNote)}>
      {children}
    </button>
  );
}
