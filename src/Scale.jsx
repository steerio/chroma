import { h } from 'preact';
import { solmization, chromatic } from './data';
import classes from 'classnames';

import "./Scale.scss";

function sharpFlat(ok, set, note) {
  if (ok) {
    if (set.has(note)) return false;
    set.add(note);
    return true;
  } else return false;
}

function renderNote(sel, n, sharpOk, flatOk) {
  if (n.pop) {
    if (sel) {
      if (sharpOk) return n[0];
      if (flatOk) return n[1];
    }
    return n.join(' ');
  } else {
    return n;
  }
}

export const Scale = ({ state: { sel, root, solfege }, scale, dispatch }) => {
  const chroma = Array(12).fill(false),
        notes = root !== null ? [ ...chromatic.slice(root), ...chromatic.slice(0, root) ] : null,
        diatonic = scale?.diatonic,
        isDia = (diatonic !== undefined);

  let sharps = new Set, flats = new Set,
      sharpOk = true, flatOk = true;

  for (let i=0; i<sel.length; i++) {
    let idx = sel[i];
    chroma[idx] = true;
    const n = notes[idx];

    if (n.pop) {
      sharpOk = sharpFlat(sharpOk, sharps, n[0][0]);
      flatOk  = sharpFlat(flatOk, flats, n[1][0]);
    } else {
      sharpOk = sharpFlat(sharpOk, sharps, n);
      flatOk  = sharpFlat(flatOk, flats, n);
    }
  }

  console.log(sharpOk, flatOk);

  return (
    <div class="scale">
      { chroma.map((selected, i) => {
          const note = notes[i];
          return (
            <div
              class={classes({ selected, white: note && note.length == 1, black: note && note.length > 1 })}
              onClick={() => dispatch(selected ? 'drop': 'add', i)}
            >
              <h2>{ i+1 }</h2>
              <div class="note">{ renderNote(selected, note, sharpOk, flatOk) }</div>
              <div>
              { solfege && selected && isDia && solmization[(diatonic + i) % 12] }
              </div>
            </div>
          );
      }) }
    </div>
  );
};
