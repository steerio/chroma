import { h } from 'preact';

import { modulo } from './lib';
import { chromatic } from './data';
import classes from 'classnames';

import "./Keyboard.scss";

// Figuring out the accidentals {{{

function sharpFlat(ok, set, note) {
  if (ok) {
    if (set.has(note)) return false;
    set.add(note);
    return true;
  } else return false;
}

function selectAccidentals(sel, absRoot) {
  const root = modulo(absRoot, 12),
        notes = [ ...chromatic.slice(root), ...chromatic.slice(0, root) ],
        sharps = new Set,
        flats = new Set;
  let sharpOk = true, flatOk = true;

  for (let i=0; i<sel.length; i++) {
    const n = notes[modulo(sel[i], 12)];

    if (n.pop) {
      sharpOk = sharpFlat(sharpOk, sharps, n[0][0]);
      flatOk  = sharpFlat(flatOk, flats, n[1][0]);
    } else {
      sharpOk = sharpFlat(sharpOk, sharps, n);
      flatOk  = sharpFlat(flatOk, flats, n);
    }
  }

  if (sharpOk == flatOk) return null;
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
