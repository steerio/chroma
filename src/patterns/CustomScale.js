import { Scale } from "./Scale";
import { arrEqual } from '../lib';

export class CustomScale extends Scale {
  constructor(name, root, notes) {
    super(name, root);
    this.notes = notes;
  }

  match(sel, root) {
    if (root === null || sel.length != this.notes.length) return false;
    const notes = root ? sel.map(i => i-root) : sel;
    return arrEqual(notes, this.notes) && this;
  }

  generate(root) {
    return this.notes.map(i => i+root);
  }
}
