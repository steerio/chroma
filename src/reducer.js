import { useReducer, useCallback } from 'preact/hooks';
import { modulo, numSort } from './lib';
import { roots } from './data';

const initialState = {
  sel: [],
  root: 0,
  solfege: true,
  carry: false,
  follow: false,
  selPat: 0
};

function shiftRoot(root, delta) {
  return roots[(roots.indexOf(root) - delta + 12) % 12]
}

function setRootFollow(state, root) {
  let sel;
  if (state.carry) {
    const delta = root - state.root;
    sel = state.sel.map(i => i+delta);
  } else {
    const tail = root+11;
    sel = numSort(state.sel.map(i => (i < root || i > tail) ? root+(modulo(i-root, 12)) : i));
  }

  return { ...state, root, sel, follow: true };
}

function reducer(state, [op, arg]) {
  const { sel } = state;
  let pos;
  switch (op) {
    case 'add':
      pos = sel.findIndex(i => i >= arg);
      if (pos == -1) return { ...state, sel: [ ...sel, arg] };
      if (sel[pos] == arg) return state;
      return {
        ...state,
        sel: [ ...sel.slice(0, pos), arg, ...sel.slice(pos) ],
        follow: false,
        selPat: 0
      };
    case 'drop':
      pos = sel.findIndex(i => i == arg);
      if (pos == -1) return state;
      return {
        ...state,
        sel: [ ...sel.slice(0, pos), ...sel.slice(pos+1) ],
        follow: false,
        selPat: 0
      };
    case 'set':
      return {
        ...state,
        sel: arg,
        follow: false,
        selPat: 0
      };
    case 'shift':
      if (!sel.length) return state;
      return {
        ...state,
        sel: numSort(sel.map(x => x-arg)),
        follow: false
      };
    case 'shiftRoot':
      return state.root === null ? state : { ...state, root: shiftRoot(state.root, arg) };
    case 'shiftRootFollow':
      const { root } = state;
      if (root === null) return state;
      return setRootFollow(state, shiftRoot(root, arg));
    case 'clear':
      return { ...state, sel: [], follow: false };
    case 'setRoot':
      return { ...state, root: arg };
    case 'setRootFollow':
      return setRootFollow(state, arg);
    case 'setSolfege':
      return { ...state, solfege: arg };
    case 'setCarry':
      return { ...state, carry: arg };
    case 'selectPattern':
      return { ...state, selPat: arg };
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
