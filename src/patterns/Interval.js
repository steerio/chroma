import { Pattern } from "./Pattern";

export class Interval extends Pattern {
  kind = 'interval';

  static intervals = [
    'Minor 2nd (m2)',
    'Major 2nd (M2)',
    'Minor 3rd (m3)',
    'Major 3rd (M3)',
    'Perfect 4th (P4)',
    'Tritone (♯4 or ♭5)',
    'Perfect 5th (P5)',
    'Minor 6th (m6)',
    'Major 6th (M6)',
    'Minor 7th (m7)',
    'Major 7th (M7)',
    'Perfect octave',
    'Minor 9th (m9)',
    'Major 9th (M9)'
  ];

  static match(sel) {
    if (sel.length != 2) return false;
    const i = Interval.intervals[sel[1] - sel[0] - 1];
    return i ? new Interval(i) : false;
  }
}
