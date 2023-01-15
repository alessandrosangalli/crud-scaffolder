import { Either, left, right } from "@/eiter";
import { FileCreateInstruction } from "./file-create-instruction";
import { FileMappingErrors } from "./file-mapping.errors";
import { FileStructure, FileStructureTypes } from "./file-structure.interface";

export type FileMappingGenerateOutput = Either<
  FileMappingErrors.FileCantHaveChild,
  FileCreateInstruction[]
>;

export class FileMapping {
  constructor() {}

  public generate(
    destinationPath: string,
    fileStructures: FileStructure[]
  ): FileMappingGenerateOutput {
    return this.fileStructureToInstructions(
      destinationPath,
      fileStructures,
      []
    );
  }

  public fileStructureToInstructions(
    destinationPath: string,
    fileStructures: FileStructure[],
    instructions: FileCreateInstruction[]
  ): FileMappingGenerateOutput {
    for (const fileStructure of fileStructures) {
      const currentPath = `${destinationPath}/${fileStructure.name}`;
      instructions.push({
        type:
          fileStructure.type === FileStructureTypes.file
            ? "create-file"
            : "create-folder",
        path: currentPath,
      });

      if (fileStructure.children.length > 0) {
        if (fileStructure.type === FileStructureTypes.file)
          return left(new FileMappingErrors.FileCantHaveChild());

        this.fileStructureToInstructions(
          currentPath,
          fileStructure.children,
          instructions
        );
      }
    }

    return right(instructions);
  }
}
