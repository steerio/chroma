import { h } from 'preact';
import { scales, chromatic } from './data';
import { playSeries, playSeriesAddOct, stop } from './play';

import "./Tools.scss";

function getRootValue(sel) {
  const v = sel.options[sel.selectedIndex].value;
  return v == '' ? null : parseInt(v);
}

export const Presets = ({ dispatch }) => {
  const batches = [];
  scales.forEach(i => {
    if (i.batch !== undefined) (batches[i.batch] ||= []).push(i);
  });

  return (
    <div class="presets">
      <div class="buttons">
        <button type="button" onClick={() => dispatch('clear')}>Clear</button>
      </div>

      { batches.map(batch => (
        <div class="buttons">
          { batch.map(i => (
            <button type="button" onClick={() => dispatch('set', i.notes)}>{ i.label || i.en }</button>
          )) }
        </div>
      )) }
    </div>
  );
}

export const Tools = ({ state: { root, sel, solfege }, dispatch }) => (
  <div class="tools">
    <div class="buttons">
      <button type="button" onClick={() => dispatch('shift', 1)}>&lt; ½</button>
      <button type="button" onClick={() => dispatch('shift', -1)}>½ &gt;</button>
    </div>

    <div class="buttons">
      <button type="button" onClick={() => dispatch('shiftRoot', 7)}>&lt; Root 5</button>
      <button type="button" onClick={() => dispatch('shiftRoot', -7)}>Root 5 &gt;</button>
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
      <button type="button" onClick={() => playSeriesAddOct(sel)}>Play +1</button>
      <button type="button" onClick={() => stop()}>Stop</button>
    </div>
  </div>
);
