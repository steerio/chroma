export const frequencies = [
  261.6, 277.2, 293.7, 311.1, 329.6,
  349.2, 370, 392, 415.3,
  440,
  466.2, 493.9
];

for (let i=0; i<12; i++) frequencies.push(frequencies[i]*2);

export const solmization = [
  'do', 'di ra',
  're', 'ri ma',
  'mi',
  'fa', 'fi se',
  'sol', 'si lo',
  'la', 'li ta',
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

export const major = [ 0, 2, 4, 5, 7, 9, 11];
export const minor = [ 0, 2, 3, 5, 7, 8, 10 ];

export const patterns = [
  {
    en: 'Ionian (major)',
    hu: 'Ión (dúr)',
    label: 'Maj',
    notes: major,
    diatonic: 0,
    batch: 0
  },
  {
    en: 'Aeolian (minor)',
    hu: 'Eol (moll)',
    label: 'Min',
    notes: minor,
    diatonic: 9,
    batch: 0
  },

  {
    en: 'Dorian',
    hu: 'Dór',
    notes: [ 0, 2, 3, 5, 7, 9, 10 ],
    diatonic: 2,
    batch: 0
  },
  {
    en: 'Phrygian',
    hu: 'Fríg',
    notes: [ 0, 1, 3, 5, 7, 8, 10 ],
    diatonic: 4,
    batch: 0
  },
  {
    en: 'Lydian',
    hu: 'Líd',
    notes: [ 0, 2, 4, 6, 7, 9, 11 ],
    diatonic: 5,
    batch: 0
  },
  {
    en: 'Lydian dominant',
    hu: 'Domináns líd',
    notes: [ 0, 2, 4, 6, 7, 9, 10 ],
    diatonic: 5
  },
  {
    en: 'Mixolydian',
    hu: 'Mixolíd',
    notes: [ 0, 2, 4, 5, 7, 9, 10 ],
    diatonic: 7,
    batch: 0
  },
  {
    en: 'Locrian',
    hu: 'Lokriszi',
    notes: [ 0, 1, 3, 5, 6, 8, 10 ],
    diatonic: 11,
    batch: 0
  },
  {
    en: 'Harmonic minor',
    hu: 'Harmonikus (összhangzatos) moll',
    label: 'Harm. minor',
    notes: [ 0, 2, 3, 5, 7, 8, 11 ],
    diatonic: 9,
    batch: 1
  },
  {
    en: 'Ascending melodic minor',
    hu: 'Emelkedő melodikus moll',
    label: 'Asc. mel. minor',
    notes: [ 0, 2, 3, 5, 7, 9, 11 ],
    diatonic: 9,
    batch: 1
  },
  {
    en: 'Whole-tone scale',
    hu: 'Egészhangú skála',
    label: 'Whole',
    notes: [ 0, 2, 4, 6, 8, 10 ],
    diatonic: 0,
    batch: 2
  },
  {
    en: 'Blues scale',
    hu: 'Blues skála',
    label: 'Blues',
    notes: [ 0, 3, 5, 6, 7, 10 ],
    diatonic: 9,
    batch: 2
  },
  {
    en: 'Major pentatonic',
    hu: 'Dúr pentaton',
    label: 'Maj5',
    notes: [ 0, 2, 4, 7, 9 ],
    diatonic: 0,
    batch: 3
  },
  {
    en: 'Minor pentatonic',
    hu: 'Moll pentaton',
    label: 'Min5',
    notes: [ 0, 3, 5, 7, 10 ],
    diatonic: 9,
    batch: 3
  },
  {
    en: 'Major triad',
    hu: 'Dúr hármashangzat',
    notes: [ 0, 4, 7 ],
    kind: 'chord',
    movable: true,
    diatonic: 0
  },
  {
    en: 'Major 7th',
    hu: 'Dúr szeptimakkord',
    notes: [ 0, 4, 7, 11 ],
    kind: 'chord',
    movable: true,
    diatonic: 0
  },
  {
    en: 'Dominant 7th',
    hu: 'Domináns szeptimakkord',
    notes: [ 0, 4, 7, 10 ],
    kind: 'chord',
    movable: true,
    diatonic: 7
  },
  {
    en: 'Minor 7th',
    hu: 'Moll szeptimakkord',
    notes: [ 0, 3, 7, 10 ],
    kind: 'chord',
    movable: true,
    diatonic: 0
  },
  {
    en: 'Minor triad',
    hu: 'Moll hármashangzat',
    notes: [ 0, 3, 7 ],
    kind: 'chord',
    movable: true,
    diatonic: 9
  },
  {
    en: 'Diminished triad',
    hu: 'Szűkített hármashangzat',
    notes: [ 0, 3, 6 ],
    kind: 'chord',
    movable: true,
    diatonic: 11
  },
  {
    en: 'Tritone',
    hu: 'Tritónusz',
    notes: [ 0, 6 ],
    kind: 'interval',
    movable: true
  },
];
