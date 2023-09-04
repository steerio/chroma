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
  const keys = [], hasRoot = root !== null,
        accidentals = selectAccidentals(sel, root),
        chroma = (hasRoot && pattern?.isOppositeC?.(root)) ? chromaticOpposite : chromatic,
        labels = pattern?.labels;
        
  let gcidx, gsidx = 0, gidx = -12; // TODO

  for (let oct=1; oct<=octaves; oct++) {
    gcidx = 0;
    for (let note of chroma) {
      const idx = gidx++,
            cidx = gcidx++,
            selected = sel.indexOf(idx) > -1,
            htmlClasses = {
              selected,
              scale: hasRoot && idx >= root && idx < root+12,
              'scale--last': idx == root+11
            };

      let label;
      if (labels) {
        if (selected) label = labels[gsidx++];
      } else if (solfege && hasRoot && selected && pattern?.diatonic) {
        label = solmization[modulo(pattern.diatonicRoot - root + cidx, 12)];
      }

      if (label?.pop) label = label.map(i => <span>{ i }</span>);

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
            { label }
          </div>
        </li>
      );
    }
  }

  return <ul class={classes("keyboard", accidentals)}>{ keys }</ul>;
};
