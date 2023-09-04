import { h } from 'preact';
import { chromatic, roots } from './data';
import { diatonicScales, importantScales } from './presets';
import { Scale, DiatonicScale } from './patterns';
import { playSeries, playSeriesAddOct, stop } from './play';

import "./Tools.scss";

const rootMenu = roots.map((n, i) => [ n, chromatic[i] ]);

function getRootValue(sel) {
  const v = sel.options[sel.selectedIndex].value;
  return v == '' ? null : parseInt(v);
}

function contained(root, sel) {
  const tail = root+11;
  return sel.every(i => i >= root && i <= tail);
}

export const Presets = ({ dispatch, root }) => {
  return (
    <div class="presets">
      <div class="buttons">
        <button type="button" onClick={() => dispatch('clear')}>Clear</button>
      </div>

      <div class="buttons">
        { diatonicScales.map(([index, label]) => (
          <button
            type="button"
            onClick={() => dispatch('set', DiatonicScale.generate(index, root))}
          >{ label }</button>
        )) }
      </div>

      <div class="buttons">
        { importantScales.map(({ label, scale }) => (
          <button
            type="button"
            onClick={() => dispatch('set', scale.generate(root))}
          >{ label }</button>
        ))}
      </div>
    </div>
  );
}

export const Tools = ({ state: { root, sel, solfege, carry, follow }, pattern, dispatch }) => {
  let shift = 'shiftRoot', set = 'setRoot';
  if (follow || pattern instanceof Scale) {
    shift += 'Follow';
    set += 'Follow';
  }

  return (
    <div class="tools">
      <div class="buttons">
        <button type="button" onClick={() => dispatch('shift', 1)}>&lt; ½</button>
        <button type="button" onClick={() => dispatch('shift', -1)}>½ &gt;</button>
      </div>

      <div class="buttons">
        <button disabled={root === null} type="button" onClick={() => dispatch(shift, 7)}>&lt; Root 5</button>
        <button disabled={root === null} type="button" onClick={() => dispatch(shift, -7)}>Root 5 &gt;</button>
      </div>

      <div>
        <label>Root:</label>
        <select onChange={e => dispatch(set, getRootValue(e.target))}>
          <option value="" selected={root === null}>None</option>
          { rootMenu.map(([n, name]) => (
              <option value={n} selected={root == n}>{ name.join ? name.join(' / ') : name }</option>
            )) }
        </select>
      </div>

      <div>
        <input
          id="tools-carry"
          type="checkbox"
          checked={carry}
          onClick={e => e.target.blur()}
          onChange={e => dispatch('setCarry', e.target.checked)}
        />
        <label for="tools-carry">Carry scale</label>
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
        <button disabled={!sel.length} type="button" onClick={() => playSeries(sel)}>Play</button>
        <button disabled={!sel.length} type="button" onClick={() => playSeriesAddOct(sel)}>Play +1</button>
        <button type="button" onClick={() => stop()}>Stop</button>
      </div>
    </div>
  );
};
