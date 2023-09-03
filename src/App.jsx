import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { Keyboard } from './Keyboard';
import { Info } from './Info';
import { Presets, Tools } from './Tools';

import { useAppReducer } from './reducer';
import { matchers } from './data';
import { arrEqual, findPattern } from './lib';

import "./App.scss";

export const App = () => {
  const [ state, dispatch ] = useAppReducer();

  const { sel, root } = state;
  const patterns = useMemo(
    () => {
      if (sel) {
        for (const m of matchers) {
          const res = m.match(sel, root);
          if (res) return res.slice ? res : [res];
        }
      }
      return null;
    },
    [ sel, root ]
  );

  const pattern = patterns?.[0];

  return (
    <div>
      <Tools
        state={state}
        pattern={pattern}
        dispatch={dispatch}
      />
      <Presets root={state.root} dispatch={dispatch} />
      <div class="octaves">
        <Keyboard
          state={state}
          pattern={pattern}
          dispatch={dispatch}
        />
      </div>
      <Info patterns={patterns} />
    </div>
  );
};
