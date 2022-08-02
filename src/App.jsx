import { h } from 'preact';
import { Scale } from './Scale';
import { ScaleInfo } from './ScaleInfo';
import { Presets, Tools } from './Tools';

import { useAppReducer } from './reducer';
import { scales } from './data';
import { arrEqual } from './lib';

import "./App.scss";

export const App = () => {
  const [state, dispatch] = useAppReducer();
  const scale = scales.find(({ notes }) => arrEqual(notes, state.sel));

  const rendered = <Scale state={state} scale={scale} dispatch={dispatch} />;

  return (
    <div>
      <Tools state={state} dispatch={dispatch} />
      <Presets dispatch={dispatch} />
      <div id="octaves">
        { rendered }
        { rendered }
        { rendered }
      </div>
      { scale && <ScaleInfo scale={scale} /> }
    </div>
  );
};
