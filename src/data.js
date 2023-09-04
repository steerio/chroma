import { Interval, CustomScale, DiatonicScale, Chord } from './patterns';

export const frequencies = [
  261.6, 277.2, 293.7, 311.1, 329.6,
  349.2, 370, 392, 415.3,
  440,
  466.2, 493.9
];

export const solmization = [
  'do', ['di', 'ra'],
  're', ['ri', 'ma'],
  'mi',
  'fa', ['fi', 'se'],
  'sol', ['si', 'lo'],
  'la', ['li', 'ta'],
  'ti'
];

export const chromatic = [
  'C', ['C♯', 'D♭'],
  'D', ['D♯', 'E♭'],
  'E',
  'F', ['F♯', 'G♭'],
  'G', ['G♯', 'A♭'],
  'A', ['A♯', 'B♭'],
  'B'
];

// Bloody roots
export const roots = [0,1,2,3,4,5,6,-5,-4,-3,-2,-1];

export const diatonicScales = DiatonicScale.names.map((m, i) => [ i, m]);
diatonicScales.splice(5, 1);
diatonicScales.splice(0, 1, [ 0, 'Maj' ], [ 5, 'Min' ]);

export const importantScales = [
  {
    label: 'Harm. minor',
    scale: new CustomScale('Harmonic minor', 9, [ 0, 2, 3, 5, 7, 8, 11 ])
  },
  {
    label: 'Asc. mel. minor',
    scale: new CustomScale('Ascending melodic minor', 9, [ 0, 2, 3, 5, 7, 9, 11 ])
  },
  {
    label: 'Blues',
    scale: new CustomScale('Blues scale', 9, [ 0, 3, 5, 6, 7, 10 ])
  },
  {
    label: 'Whole',
    scale: new CustomScale('Whole tone scale', null, [ 0, 2, 4, 6, 8, 10])
  },
  {
    label: 'Maj5',
    scale: new CustomScale('Major pentatonic', 0, [ 0, 2, 4, 7, 9 ]),
  },
  {
    label: 'Min5',
    scale: new CustomScale('Minor pentatonic', 9, [ 0, 3, 5, 7, 10 ])
  }
];

export const matchers = [
  Interval,
  DiatonicScale,
  Chord,
  ...importantScales.map(i => i.scale),
  new CustomScale('Lydian dominant', 3, [ 0, 2, 4, 6, 7, 9, 10 ])
];
