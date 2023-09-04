import { Scale } from "./Scale";
import { modulo, arrEqual } from '../lib';

const major = [ 0, 2, 4, 5, 7, 9, 11 ];

const scales = [ major ];
for (let i=0; i<6; i++) {
  const notes = scales[i],
        r = notes[1];
  scales.push([ 0, ...notes.slice(2).map(i => i-r), 12 - r ]);
}

export class DiatonicScale extends Scale {
  exactKind = 'Diatonic Scale';

  constructor(index) {
    super(DiatonicScale.names[index], major[index]);
  }

  get diatonic() {
    return true;
  }

  static names = [
    'Ionian (major)',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Myxolidian',
    'Aeolian (minor)',
    'Locrian'
  ];

  static match(sel, root) {
    if (root === null || sel.length != 7 || sel[0] != root) return false;
    const notes = root ? sel.map(i => i-root) : sel;

    for (let i=0; i<7; i++)
      if (arrEqual(notes, scales[i])) return new DiatonicScale(i);
    return false;
  }

  relativeMajorRoot(root) {
    return modulo(root - this.diatonicRoot, 12);
  }

  isOppositeC(root) {
    console.log("Rel. major root", this.relativeMajorRoot(root));
    return this.relativeMajorRoot(root) == 6;
  }

  generate(root) {
    return DiatonicScale.generate(this.index, root);
  }

  static generate(index, root) {
    return scales[index].map(i => i+root);
  }
}
