export interface FileCreateInstruction {
  type: "create-folder" | "create-file";
  path: string;
}
