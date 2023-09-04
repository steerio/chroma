export class Pattern {
  constructor(name) {
    this.name = name;
  }

  static match(_sel, _root) {
    return false;
  }

  static generate(_data, _root) {
    return null;
  }

  match(_sel, _root) {
    return false;
  }

  generate(_root) {
    return null;
  }

  get label() {
    return this.exactKind || this.kind;
  }

  get diatonic() {
    return false;
  }
}
