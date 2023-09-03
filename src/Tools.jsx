import { h } from 'preact';
import { chromatic, roots } from './data';
import { DiatonicScale } from './patterns';
import { playSeries, playSeriesAddOct, stop } from './play';

import "./Tools.scss";

const rootMenu = roots.map((n, i) => [ n, chromatic[i] ]);

const diaScales = DiatonicScale.names.map((m, i) => [ i, m]);
diaScales.splice(5, 1);
diaScales.splice(0, 1, [ 0, 'Maj' ], [ 5, 'Min' ]);

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
        { diaScales.map(([index, label]) => (
          <button
            type="button"
            onClick={() => dispatch('set', DiatonicScale.generate(index, root))}
          >{ label }</button>
        )) }
      </div>
    </div>
  );
}

export const Tools = ({ state: { root, sel, solfege, carry }, pattern, dispatch }) => {
  let shift = 'shiftRoot', set = 'setRoot';
  if (sel.length == 7 && contained(root, sel)) {
    shift += 'Dia';
    set += 'Dia'
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
