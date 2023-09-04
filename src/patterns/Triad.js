import { Chord } from './Chord';
import { ordinals } from '../data';

function find(notes) {
  const a = notes[1] - notes[0],
        b = notes[2] - notes[1];

  switch (a) {
    case 4:
      switch (b) {
        case 3: return 'Major triad';
        case 4: return 'Augmented triad';
      }
      break;
    case 3:
      switch (b) {
        case 4: return 'Minor triad';
        case 3: return 'Diminished triad';
      }
  }
  return null;
}

export class Triad extends Chord {
  static match(sel) {
    if (sel.length != 3) return false;

    const labels = [1,2,3];
    for (let i=3; i; i--) {
      let res = find(sel); 
      if (res) {
        const pt = new Triad(res);
        if (i < 3) pt.subtitle = `${ordinals[i]} inversion`;
        pt.labels = labels;
        return pt;
      }
      labels.unshift(labels.pop());
      sel = [...sel.slice(1), sel[0]+12 ];
    }
  }
}
