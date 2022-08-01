export const frequencies = [
  261.6, 277.2, 293.7, 311.1, 329.6,
  349.2, 370, 392, 415.3,
  440,
  466.2, 493.9
];

for (let i=0; i<12; i++) frequencies.push(frequencies[i]*2);

export const solmization = [
  'dó', 'di ra',
  'ré', 'ri ma',
  'mi',
  'fá', 'fi sza',
  'szó', 'szi lu',
  'lá', 'li tá',
  'ti'
];

export const chromatic = [
  'C', 'C# Db',
  'D', 'D# Eb',
  'E',
  'F', 'F# Gb',
  'G', 'G# Ab',
  'A', 'A# Bb',
  'B'
];

export const major = [ 0, 2, 4, 5, 7, 9, 11];
export const minor = [ 0, 2, 3, 5, 7, 8, 10 ];

export const scales = [
  {
    en: 'Ionian (major)',
    hu: 'Ión (dúr)',
    notes: major,
    diatonic: 0
  },
  {
    en: 'Aeolian (minor)',
    hu: 'Eol (moll)',
    notes: minor,
    diatonic: 9
  },

  {
    en: 'Dorian',
    hu: 'Dór',
    notes: [ 0, 2, 3, 5, 7, 9, 10 ],
    diatonic: 2
  },
  {
    en: 'Phrygian',
    hu: 'Fríg',
    notes: [ 0, 1, 3, 5, 7, 8, 10 ],
    diatonic: 4
  },
  {
    en: 'Lydian',
    hu: 'Líd',
    notes: [ 0, 2, 4, 6, 7, 9, 11 ],
    diatonic: 5
  },
  {
    en: 'Mixolydian',
    hu: 'Mixolíd',
    notes: [ 0, 2, 4, 5, 7, 9, 10 ],
    diatonic: 7
  },
  {
    en: 'Harmonic minor',
    hu: 'Harmonikus (összhangzatos) moll',
    notes: [ 0, 2, 3, 5, 7, 8, 11 ],
    diatonic: 9
  },
  {
    en: 'Locrian',
    hu: 'Lokriszi',
    notes: [ 0, 1, 3, 5, 6, 8, 10 ],
    diatonic: 11
  },
  {
    en: 'Whole-tone scale',
    hu: 'Egészhangú skála',
    notes: [ 0, 2, 4, 6, 8, 10 ],
    diatonic: 0
  },
  {
    en: 'Blues scale',
    hu: 'Blues skála',
    notes: [ 0, 3, 5, 6, 7, 10 ],
  },
  {
    en: 'Major triad',
    hu: 'Dúr hármashangzat',
    notes: [ 0, 4, 7 ],
    kind: 'chord',
    diatonic: 0
  },
  {
    en: 'Minor triad',
    hu: 'Moll hármashangzat',
    notes: [ 0, 3, 7 ],
    kind: 'chord',
    diatonic: 9
  },
  {
    en: 'Diminished triad',
    hu: 'Szűkített hármashangzat',
    notes: [ 0, 3, 6 ],
    kind: 'chord',
    diatonic: 11
  },
];
