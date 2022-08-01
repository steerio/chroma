import { h } from 'preact';
import { solmization, chromatic } from './data';
import classes from 'classnames';

import "./Scale.scss";

export const Scale = ({ state: { sel, root, solfege }, scale, dispatch }) => {
  const chroma = Array(12).fill(false),
        diatonic = scale?.diatonic,
        isDia = (diatonic !== undefined);

  for (let i=0; i<sel.length; i++) chroma[sel[i]] = true;

  return (
    <div class="scale">
      { chroma.map((selected, i) => (
        <div
          class={classes({ selected })}
          onClick={() => dispatch(selected ? 'drop': 'add', i)}
        >
          <h2>{ i+1 }</h2>
          <div class="note">{ root !== null && chromatic[(i+root) % 12] }</div>
          <div>
          { solfege && selected && isDia && solmization[(diatonic + i) % 12] }
          </div>
        </div>
      )) }
    </div>
  );
};
