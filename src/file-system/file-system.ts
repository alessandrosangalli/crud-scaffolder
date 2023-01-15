import * as fs from "fs";

export interface IFileSystem {
  writeFile(name: string, content: string, encoding: "utf-8"): void;
  writeFolder(name: string): void;
}

export class FileSystem implements IFileSystem {
  writeFile(name: string, content: string, encoding: "utf-8") {
    fs.writeFileSync(name, content, { encoding });
  }

  writeFolder(name: string) {
    fs.mkdirSync(name);
  }
}
