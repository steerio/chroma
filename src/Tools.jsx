import { h } from 'preact';
import { major, minor, chromatic } from './data';
import { playSeries, playSeriesReturn, stop } from './play';

import "./Tools.scss";

function getRootValue(sel) {
  const v = sel.options[sel.selectedIndex].value;
  return v == '' ? null : parseInt(v);
}

export const Tools = ({ state: { root, sel, solfege }, dispatch }) => (
  <div id="tools">
    <div class="buttons">
      <button type="button" onClick={() => dispatch('shift', 1)}>&lt; Shift</button>
      <button type="button" onClick={() => dispatch('shift', -1)}>Shift &gt;</button>
    </div>

    <div class="buttons">
      <button type="button" onClick={() => dispatch('set', major)}>Maj</button>
      <button type="button" onClick={() => dispatch('set', minor)}>Min</button>
      <button type="button" onClick={() => dispatch('clear')}>Clear</button>
    </div>

    <div>
      <label>Root:</label>
      <select onChange={e => dispatch('setRoot', getRootValue(e.target))}>
        <option value="" selected={root === null}>None</option>
        { chromatic.map((n, i) => (
            <option value={i} selected={root == i}>{ n }</option>
          )) }
      </select>
    </div>
    <div>
      <input
        id="tools-solfege"
        type="checkbox"
        checked={solfege}
        onClick={e => e.target.blur()}
        onChange={e => dispatch('setSolfege', e.target.checked)}
      />
      <label for="tools-solfege">Solfeggio</label>
    </div>
    <div class="buttons">
      <button type="button" onClick={() => playSeries(sel)}>Play</button>
      <button type="button" onClick={() => playSeriesReturn(sel)}>Play +1</button>
      <button type="button" onClick={() => stop()}>Stop</button>
    </div>
  </div>
);
