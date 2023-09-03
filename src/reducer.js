import { useReducer, useCallback } from 'preact/hooks';
import { numSort } from './lib';
import { roots } from './data';

const initialState = {
  sel: [],
  root: 0,
  solfege: true,
  patterns: []
};

function shiftRoot(root, delta) {
  return roots[(roots.indexOf(root) - delta + 12) % 12]
}

function reducer(state, [op, arg]) {
  const { sel } = state;
  let delta, pos;
  switch (op) {
    case 'add':
      pos = sel.findIndex(i => i >= arg);
      if (pos == -1) return { ...state, sel: [ ...sel, arg] };
      if (sel[pos] == arg) return state;
      return { ...state, sel: [ ...sel.slice(0, pos), arg, ...sel.slice(pos) ]};
    case 'drop':
      pos = sel.findIndex(i => i == arg);
      if (pos == -1) return state;
      return { ...state, sel: [ ...sel.slice(0, pos), ...sel.slice(pos+1) ]};
    case 'set':
      return { ...state, sel: arg };
    case 'shift':
      if (!sel.length) return state;
      return {
        ...state,
        sel: numSort(sel.map(x => x-arg))
      };
    case 'shiftRoot':
      return state.root === null ? state : { ...state, root: shiftRoot(state.root, arg) };
    case 'shiftAll':
      if (state.root === null) return state;
      const root = shiftRoot(state.root, arg);
      delta = root - state.root;
      return {
        ...state,
        root,
        sel: sel.map(i => i + delta)
      };
    case 'clear':
      return { ...state, sel: [] };
    case 'setRoot':
      return { ...state, root: arg };
    case 'moveRoot':
      delta = arg - state.root;
      return { ...state, root: arg, sel: sel.map(i => i + delta) };
    case 'setSolfege':
      return { ...state, solfege: arg };
  }
}

export function useAppReducer() {
  const [state, dispatch_] = useReducer(reducer, initialState);
  const dispatch = useCallback(
    (op, arg) => dispatch_([ op, arg ]),
    [ dispatch_ ]
  );
  return [state, dispatch];
}
