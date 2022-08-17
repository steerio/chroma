import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { Scale } from './Scale';
import { Info } from './Info';
import { Presets, Tools } from './Tools';

import { useAppReducer } from './reducer';
import { patterns } from './data';
import { arrEqual, findPattern } from './lib';

import "./App.scss";

const noPattern = [ null, null ];

export const App = () => {
  const [ state, dispatch ] = useAppReducer();

  const [ pattern, root ] = useMemo(
    () => {
      const { sel } = state;
      if (!sel) return noPattern;
      for (const i of patterns) {
        const { movable, notes } = i;
        if (movable) {
          const idx = findPattern(notes, sel);
          if (idx >= 0) return [ i, idx ];
        } else if (arrEqual(notes, sel)) {
          return [ i, 0 ];
        }
      }
      return noPattern;
    },
    [ state.sel ]
  );

  const rendered = (
    <Scale
      state={state}
      pattern={pattern} patternRoot={root}
      dispatch={dispatch}
    />
  );

  return (
    <div>
      <Tools state={state} dispatch={dispatch} />
      <Presets dispatch={dispatch} />
      <div id="octaves">
        { rendered }
        { rendered }
        { rendered }
      </div>
      { pattern && <Info pattern={pattern} /> }
    </div>
  );
};
