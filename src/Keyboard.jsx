import { h, Fragment } from 'preact';

import { modulo, hasDupes } from './lib';
import { chromatic, solmization } from './data';
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
  let cidx;
  let gidx = -12; // TODO

  for (let oct=1; oct<=octaves; oct++) {
    cidx = 0;
    for (let note of chromatic) {
      const idx = gidx++,
            chroma = cidx++,
            selected = sel.indexOf(idx) > -1,
            htmlClasses = {
              selected,
              scale: hasRoot && idx >= root && idx < root+12
            };

      let mainClass, key, content;
      if (note.length == 1) {
        mainClass = 'white';
        key = `${note}-${oct}`;
        content = note;
      } else {
        mainClass = 'black';
        key = `${note}${oct}`;
        content = <>
          <span class="sharp">{ note[0] }</span>
          <span class="flat">{ note[1] }</span>
        </>;
      }

      let sol =
        solfege && hasRoot && selected && pattern?.diatonicRoot !== undefined &&
        solmization[modulo(pattern.diatonicRoot - root + chroma, 12)];

      if (sol.pop) sol = sol.map(i => <span>{ i }</span>);

      keys.push(
        <li
          key={key}
          class={classes(mainClass, htmlClasses)}
          data-idx={idx}
          onClick={() => dispatch(selected ? 'drop' : 'add', idx)}
        >
          <div class="key">{ content }</div>
          <div class="misc">
            { sol }
          </div>
        </li>
      );
    }
  }

  return <ul class={classes("keyboard", selectAccidentals(sel, root))}>{ keys }</ul>;
};
