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
  'C', ['C#', 'Db'],
  'D', ['D#', 'Eb'],
  'E',
  'F', ['F#', 'Gb'],
  'G', ['G#', 'Ab'],
  'A', ['A#', 'Bb'],
  'B'
];

// Bloody roots
export const roots = [0,1,2,3,4,5,6,-5,-4,-3,-2,-1];

export const matchers = [
  Interval,
  DiatonicScale,
  Chord,
  new CustomScale('Lydian dominant', 3, [ 0, 2, 4, 6, 7, 9, 10 ]),
  new CustomScale('Harmonic minor', 6, [ 0, 2, 3, 5, 7, 8, 11 ]),
  new CustomScale('Ascending melodic minor', 6, [ 0, 2, 3, 5, 7, 9, 11 ]),
  new CustomScale('Whole tone scale', null, [ 0, 2, 4, 6, 8, 10]),
  new CustomScale('Blues scale', 6, [ 0, 3, 5, 6, 7, 10 ]),
  new CustomScale('Major pentatonic', 0, [ 0, 2, 4, 7, 9 ]),
  new CustomScale('Minor pentatonic', 6, [ 0, 3, 5, 7, 10 ])
];

