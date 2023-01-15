export namespace FileMappingErrors {
  export class FileCantHaveChild extends Error {
    constructor() {
      super("File cant have child, only folders can");
      this.name = FileCantHaveChild.name;
    }
  }
}
