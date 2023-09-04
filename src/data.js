export const major = [ 0, 2, 4, 5, 7, 9, 11 ];

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

export const chromaticOpposite = [
  ...chromatic.slice(0, 5),
  ['E#', 'F'],
  ...chromatic.slice(6, 11),
  ['B', 'C♭']
];

// Bloody roots
export const roots = [0,1,2,3,4,5,6,-5,-4,-3,-2,-1];

export const ordinals = [null, "1st", "2nd", "3rd"];
