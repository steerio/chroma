import { Pattern } from "./Pattern";

export class Scale extends Pattern {
  kind = 'scale';

  constructor(name, root=null) {
    super(name);
    this.diatonicRoot = root;
  }

  get diatonic() {
    return this.diatonicRoot !== null;
  }
}
