import { useReducer, useCallback } from 'preact/hooks';

const initialState = {
  sel: [],
  root: 0,
  solfege: true
};

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
      return {
        ...state,
        sel: sel.map(x => (x+arg+12) % 12).sort((a, b) => a-b),
        root: state.root == null ? null : (state.root - arg + 12) % 12
      };
    case 'shiftRoot':
      return {
        ...state,
        root: state.root == null ? null : (state.root - arg + 12) % 12
      }
    case 'clear':
      return { ...state, sel: [] };
    case 'setRoot':
      return { ...state, root: arg };
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
