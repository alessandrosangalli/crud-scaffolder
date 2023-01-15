export interface FileStructure {
  type: "file" | "folder";
  name: string;
  children: FileStructure[];
}
