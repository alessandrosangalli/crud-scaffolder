import { FileMapping } from "./file-mapping";
import { FileMappingErrors } from "./file-mapping.errors";
import { FileStructureTypes } from "./file-structure.interface";

describe("File Manager", () => {
  test("Should create a folder", () => {
    const fileMapping = new FileMapping();
    const destinationPath = "/destination/my-home/my-project";

    const result = fileMapping.generate(destinationPath, [
      {
        type: FileStructureTypes.folder,
        name: "controllers",
        children: [],
      },
    ]);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([
      {
        type: "create-folder",
        path: destinationPath + "/controllers",
      },
    ]);
  });

  test("Should create a file", () => {
    const fileMapping = new FileMapping();
    const destinationPath = "/destination/my-home/my-project";

    const result = fileMapping.generate(destinationPath, [
      {
        type: FileStructureTypes.file,
        name: "my-controller.ts",
        children: [],
      },
    ]);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([
      {
        type: "create-file",
        path: destinationPath + "/my-controller.ts",
      },
    ]);
  });

  test("Should create a file in a folder", () => {
    const fileMapping = new FileMapping();
    const destinationPath = "/destination/my-home/my-project";

    const result = fileMapping.generate(destinationPath, [
      {
        type: FileStructureTypes.folder,
        name: "controllers",
        children: [
          {
            type: FileStructureTypes.file,
            name: "my-controller.ts",
            children: [],
          },
        ],
      },
    ]);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([
      {
        type: "create-folder",
        path: destinationPath + "/controllers",
      },
      {
        type: "create-file",
        path: destinationPath + "/controllers/my-controller.ts",
      },
    ]);
  });

  test("A folder with another folder and a file", () => {
    const fileMapping = new FileMapping();
    const destinationPath = "/destination/my-home/my-project";

    const result = fileMapping.generate(destinationPath, [
      {
        type: FileStructureTypes.folder,
        name: "controllers",
        children: [
          {
            type: FileStructureTypes.folder,
            name: "requests",
            children: [],
          },
          {
            type: FileStructureTypes.file,
            name: "my-controller.ts",
            children: [],
          },
        ],
      },
    ]);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([
      {
        type: "create-folder",
        path: destinationPath + "/controllers",
      },
      {
        type: "create-folder",
        path: destinationPath + "/controllers/requests",
      },
      {
        type: "create-file",
        path: destinationPath + "/controllers/my-controller.ts",
      },
    ]);
  });

  test("Three levels of folders", () => {
    const fileMapping = new FileMapping();
    const destinationPath = "/destination/my-home/my-project";

    const result = fileMapping.generate(destinationPath, [
      {
        type: FileStructureTypes.folder,
        name: "controllers",
        children: [
          {
            type: FileStructureTypes.folder,
            name: "requests",
            children: [
              {
                type: FileStructureTypes.folder,
                name: "create-user-request",
                children: [],
              },
            ],
          },
        ],
      },
    ]);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([
      {
        type: "create-folder",
        path: destinationPath + "/controllers",
      },
      {
        type: "create-folder",
        path: destinationPath + "/controllers/requests",
      },
      {
        type: "create-folder",
        path: destinationPath + "/controllers/requests/create-user-request",
      },
    ]);
  });

  test("Four levels of folders and files", () => {
    const fileMapping = new FileMapping();
    const destinationPath = "/destination/my-home/my-project";

    const result = fileMapping.generate(destinationPath, [
      {
        type: FileStructureTypes.folder,
        name: "controllers",
        children: [
          {
            type: FileStructureTypes.folder,
            name: "requests",
            children: [
              {
                type: FileStructureTypes.folder,
                name: "create-user-request",
                children: [
                  {
                    type: FileStructureTypes.file,
                    name: "create-user-request.ts",
                    children: [],
                  },
                ],
              },
              {
                type: FileStructureTypes.folder,
                name: "edit-user-request",
                children: [
                  {
                    type: FileStructureTypes.file,
                    name: "edit-user-request.ts",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual([
      {
        type: "create-folder",
        path: destinationPath + "/controllers",
      },
      {
        type: "create-folder",
        path: destinationPath + "/controllers/requests",
      },
      {
        type: "create-folder",
        path: destinationPath + "/controllers/requests/create-user-request",
      },
      {
        type: "create-file",
        path:
          destinationPath +
          "/controllers/requests/create-user-request/create-user-request.ts",
      },
      {
        type: "create-folder",
        path: destinationPath + "/controllers/requests/edit-user-request",
      },
      {
        type: "create-file",
        path:
          destinationPath +
          "/controllers/requests/edit-user-request/edit-user-request.ts",
      },
    ]);
  });

  test("Should return error when try create a child of file", () => {
    const fileMapping = new FileMapping();
    const destinationPath = "/destination/my-home/my-project";

    const result = fileMapping.generate(destinationPath, [
      {
        type: FileStructureTypes.file,
        name: "my-controller.ts",
        children: [
          {
            type: FileStructureTypes.file,
            name: "my-controller.ts",
            children: [],
          },
        ],
      },
    ]);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(FileMappingErrors.FileCantHaveChild);
  });
});
