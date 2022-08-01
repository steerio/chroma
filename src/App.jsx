import { h } from 'preact';
import { Scale } from './Scale';
import { ScaleInfo } from './ScaleInfo';
import { Tools } from './Tools';

import { useAppReducer } from './reducer';
import { scales } from './data';
import { arrEqual } from './lib';

import "./App.scss";

export const App = () => {
  const [state, dispatch] = useAppReducer();
  const scale = scales.find(({ notes }) => arrEqual(notes, state.sel));

  return (
    <div>
      <Tools state={state} dispatch={dispatch} />
      <div id="octaves">
        <Scale state={state} scale={scale} dispatch={dispatch} />
        <Scale state={state} scale={scale} dispatch={dispatch} />
        <Scale state={state} scale={scale} dispatch={dispatch} />
      </div>
      { scale && <ScaleInfo scale={scale} /> }
    </div>
  );
};
