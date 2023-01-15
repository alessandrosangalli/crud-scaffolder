import { IFileSystem } from "@/file-system/file-system";

export class FileSystemStub implements IFileSystem {
  writeFolder(name: string): void {
    return null;
  }
  writeFile(name: string, content: string, encoding: "utf-8") {
    return null;
  }
}
