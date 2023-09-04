import { Interval, CustomScale, DiatonicScale, Triad } from './patterns';

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
  },
  {
    label: 'Alt',
    scale: new CustomScale('Altered dominant', 7, [ 0, 1, 3, 4, 6, 8, 10 ])
  }
];

export const matchers = [
  Interval,
  DiatonicScale,
  Triad,
  ...importantScales.map(i => i.scale),
  new CustomScale('Lydian dominant', 5, [ 0, 2, 4, 6, 7, 9, 10 ])
];
