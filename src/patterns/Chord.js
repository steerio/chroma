import { Pattern } from "./Pattern";
import { modulo } from '../lib';
import { detect } from '@tonaljs/chord-detect';
import { get } from '@tonaljs/chord';
import { enharmonic, simplify } from '@tonaljs/note';
import { basicChromatic, inversions } from '../data';

function toLabel(i) {
  if (i == '1P') return 'R';
  const step = i.slice(0, -1),
        q = i.slice(-1);
  switch (q) {
    case 'A': return `△${step}`;
    case 'd': return `°${step}`;
    default: return q+step;
  }
}

function toName(i) {
  return i.
    replace('M', '').
    replace(/(\+|aug)/, '△').
    replace(/(-|dim)/, '°').
    replace('ma7', 'maj7').
    replace('o7', '°maj7').
    replace('no5', '').
    replaceAll('#', '♯').
    replaceAll('b', '♭');
}

function normalize(note) {
  const s = simplify(note);
  return s[1] == 'b' ? enharmonic(s) : s;
}

const omitted = 'P5 is omitted';

export class Chord extends Pattern {
  kind = 'chord';

  static match(sel) {
    if (sel.length < 3 || sel.length > 5) return null;

    const notes = sel.map(i => {
      const res = basicChromatic[modulo(i, 12)]
      return res.pop ? res[0] : res;
    });

    return detect(notes).map(i => {
      const n = i.replace(/\/[CDEFGAB][^/]*$/, '')
      const raw = get(n),
            chNotes = raw.notes.map(normalize),
            chord = new Chord(toName(raw.symbol));

      chord.labels = notes.map(n => {
        const idx = chNotes.indexOf(n);
        return idx > -1 ? toLabel(raw.intervals[idx]) : null;
      });

      chord.more = inversions[chNotes.indexOf(notes[0])];
      if (raw.symbol.indexOf('no5') > -1)
        chord.more = chord.more ? `${chord.more}, ${omitted}` : omitted;

      return chord;
    });
  }
}
