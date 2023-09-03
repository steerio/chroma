import { h } from 'preact';

import { modulo, hasDupes } from './lib';
import { chromatic } from './data';
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
  const keys = [];
  let gidx = -12; // TODO

  for (let oct=1; oct<=octaves; oct++) {
    for (let note of chromatic) {
      const idx = gidx++;
      const selected = sel.indexOf(idx) > -1,
            htmlClasses = {
              selected,
              scale:  root !== null && idx >= root && idx < root+12
            },
            clicked = () => dispatch(selected ? 'drop' : 'add', idx);

      if (note.length == 1) {
        // White
        keys.push(
          <li
            class={classes('white', htmlClasses)}
            data-idx={idx}
            onClick={clicked}
            key={`${note}-${oct}`}>
            <div class="key">{ note }</div>
          </li>
        );
      } else {
        // Black
        keys.push(
          <li
            class={classes('black', htmlClasses)}
            data-idx={idx}
            onClick={clicked}
            key={`${note}${oct}`}
          >
            <div class="key">
              <span class="sharp">{ note[0] }</span>
              <span class="flat">{ note[1] }</span>
            </div>
          </li>
        );
      }
    }
  }

  const accidentals = (root !== null && pattern?.diatonic) ?
    selectAccidentals(sel, root) :
    null;

  return <ul class={classes("keyboard", accidentals)}>{ keys }</ul>;
};
