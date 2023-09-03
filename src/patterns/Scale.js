import { Pattern } from "./Pattern";

export class Scale extends Pattern {
  kind = 'scale';

  constructor(name, root=null) {
    super();
    this.name = name;
    this.diatonicRoot = root;
  }

  get label() {
    return this.exactKind || this.kind;
  }

  get diatonic() {
    return this.diatonicRoot !== null;
  }
}
