import { useReducer, useCallback } from 'preact/hooks';
import { modulo, numSort } from './lib';
import { roots } from './data';

const initialState = {
  sel: [],
  root: 0,
  solfege: true,
  carry: false,
  patterns: []
};

function shiftRoot(root, delta) {
  return roots[(roots.indexOf(root) - delta + 12) % 12]
}

function setRootDia(state, root) {
  let sel;
  if (state.carry) {
    const delta = root - state.root;
    sel = state.sel.map(i => i+delta);
  } else {
    const tail = root+11;
    sel = numSort(state.sel.map(i => (i < root || i > tail) ? root+(modulo(i-root, 12)) : i));
  }

  return { ...state, root, sel };
}

function reducer(state, [op, arg]) {
  const { sel } = state;
  let pos;
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
    case 'shiftRootDia':
      const { root } = state;
      if (root === null) return state;
      return setRootDia(state, shiftRoot(root, arg));
    case 'clear':
      return { ...state, sel: [] };
    case 'setRoot':
      return { ...state, root: arg };
    case 'setRootDia':
      return setRootDia(state, arg);
    case 'setSolfege':
      return { ...state, solfege: arg };
    case 'setCarry':
      return { ...state, carry: arg };
  }
  return state;
}

export function useAppReducer() {
  const [state, dispatch_] = useReducer(reducer, initialState);
  const dispatch = useCallback(
    (op, arg) => dispatch_([ op, arg ]),
    [ dispatch_ ]
  );
  return [state, dispatch];
}
