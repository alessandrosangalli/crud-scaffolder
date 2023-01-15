import { IFileSystem } from "@/file-system/file-system";

export class FileRepository {
  constructor(private readonly fileSystem: IFileSystem) {}

  public createFile(name: string, content: string): void {
    this.fileSystem.writeFile(name, content, "utf-8");
  }

  public createFolder(name: string, content: string): void {
    this.fileSystem.writeFile(name, content, "utf-8");
  }
}
