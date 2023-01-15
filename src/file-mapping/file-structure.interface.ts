export enum FileStructureTypes {
  "file",
  "folder",
}

export interface FileStructure {
  type: FileStructureTypes;
  name: string;
  children: FileStructure[];
}
