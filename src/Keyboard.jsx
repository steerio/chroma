import { h, Fragment } from 'preact';

import { modulo, hasDupes } from './lib';
import { major, chromatic, chromaticOpposite, solmization } from './data';
import classes from 'classnames';
import "./Keyboard.scss";

// Figuring out the accidentals {{{

const sharps = chromatic.map(i => (i.pop ? i[0] : i)[0]),
      flats  = chromatic.map(i => (i.pop ? i[1] : i)[0]);

function selectAccidentals(absSel) {
  const sel = [...new Set(absSel.map(i => modulo(i, 12)))],
        sharpOk = !hasDupes(sel.map(i => sharps[i])),
        flatsOk = !hasDupes(sel.map(i => flats[i]));

  if (sharpOk == flatsOk) return null;
  return sharpOk ? 'sharps' : 'flats';
}

// }}}

export const Keyboard = ({ state: { sel, root, solfege }, pattern, octaves=3, dispatch }) => {
  const keys = [], hasRoot = root !== null;
  let gcidx, gidx = -12; // TODO

  let accidentals = selectAccidentals(sel, root),
      chroma = chromatic;
  if (hasRoot && pattern?.isOppositeC && pattern.isOppositeC(root))
    chroma = chromaticOpposite;

  for (let oct=1; oct<=octaves; oct++) {
    gcidx = 0;
    for (let note of chroma) {
      const idx = gidx++,
            cidx = gcidx++,
            selected = sel.indexOf(idx) > -1,
            htmlClasses = {
              selected,
              scale: hasRoot && idx >= root && idx < root+12
            };

      let sol =
        solfege && hasRoot && selected && pattern?.diatonic &&
        solmization[modulo(pattern.diatonicRoot - root + cidx, 12)];

      if (sol?.pop) sol = sol.map(i => <span>{ i }</span>);

      keys.push(
        <li
          key={idx}
          class={classes(major.indexOf(cidx) > -1 ? 'white' : 'black', htmlClasses)}
          data-idx={idx}
          onClick={() => dispatch(selected ? 'drop' : 'add', idx)}
        >
          <div class="key">
            { note.pop ?
              <>
                <span class="sharp">{ note[0] }</span>
                <span class="flat">{ note[1] }</span>
              </> :
              note
            }
          </div>
          <div class="misc">
            { sol }
          </div>
        </li>
      );
    }
  }

  return <ul class={classes("keyboard", accidentals)}>{ keys }</ul>;
};
