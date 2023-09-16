import { h } from 'preact';
import { useMemo, useEffect } from 'preact/hooks';

import { Keyboard } from './Keyboard';
import { Info } from './Info';
import { Presets, Tools } from './Tools';

import { useAppReducer } from './reducer';
import { matchers } from './presets';
import { setupMidi } from './midi';

import "./App.scss";

const ADJ_OCTAVES = 1;

export const App = () => {
  const [ state, dispatch ] = useAppReducer();

  useEffect(() => setupMidi(dispatch, ADJ_OCTAVES), [dispatch]);

  const { sel, selPat, root } = state;
  const patterns = useMemo(
    () => sel.length ? matchers.flatMap(m => m.match(sel, root)).filter(i => i) : null,
    [ sel, root ]
  );

  const pattern = patterns?.[selPat];

  return (
    <div>
      <Tools
        state={state}
        pattern={pattern}
        dispatch={dispatch}
      />
      <Presets
        root={state.root}
        sel={state.sel}
        dispatch={dispatch}
      />
      <div class="octaves">
        <Keyboard
          state={state}
          adjOctaves={ADJ_OCTAVES}
          pattern={pattern}
          dispatch={dispatch}
        />
      </div>
      <Info
        patterns={patterns}
        sel={selPat}
        dispatch={dispatch}
      />
    </div>
  );
};
