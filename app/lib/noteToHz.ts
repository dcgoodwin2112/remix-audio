export type Note =
  | "C3"
  | "C#3"
  | "D3"
  | "D#3"
  | "E3"
  | "F3"
  | "F#3"
  | "G3"
  | "G#3"
  | "A3"
  | "A#3"
  | "B3"
  | "C4"
  | "C#4"
  | "D4"
  | "D#4"
  | "E4"
  | "F4"
  | "F#4"
  | "G4"
  | "G#4"
  | "A4"
  | "A#4"
  | "B4"
  | "C5"
  | "C#5"
  | "D5"
  | "D#5"
  | "E5"
  | "F5"
  | "F#5"
  | "G5"
  | "G#5"
  | "A5"
  | "A#5"
  | "B5"
  | "C6";

const noteToSemitone = new Map<Note, number>([
  ["C3", -21],
  ["C#3", -20],
  ["D3", -19],
  ["D#3", -18],
  ["E3", -17],
  ["F3", -16],
  ["F#3", -15],
  ["G3", -14],
  ["G#3", -13],
  ["A3", -12],
  ["A#3", -11],
  ["B3", -10],
  ["C4", -9],
  ["C#4", -8],
  ["D4", -7],
  ["D#4", -6],
  ["E4", -5],
  ["F4", -4],
  ["F#4", -3],
  ["G4", -2],
  ["G#4", -1],
  ["A4", 0],
  ["A#4", 1],
  ["B4", 2],
  ["C5", 3],
  ["C#5", 4],
  ["D5", 5],
  ["D#5", 6],
  ["E5", 7],
  ["F5", 8],
  ["F#5", 9],
  ["G5", 10],
  ["G#5", 11],
  ["A5", 12],
  ["A#5", 13],
  ["B5", 14],
  ["C6", 15],
]);

export default function getNoteFrequency(note: Note) {
  return getFrequency(noteToSemitone.get(note) ?? 0);
}

export function getOctaveFrequency(
  note: Note,
  direction: "up" | "down" = "up"
) {
  const noteSemitones = noteToSemitone.get(note) ?? 0;
  return direction === "up"
    ? getFrequency(noteSemitones + 12)
    : getFrequency(noteSemitones - 12);
}

function getFrequency(steps: number) {
  return (2 ** (1 / 12)) ** steps * 440;
}
