import { readFileSync, readdirSync } from "fs";
import path from "path";

class SnippetGenerator {
  _filesRead = [];
  template;
  folder;
  folderLocation;
  outputWriter;
  files;

  constructor(template, folder, outputWriter, root = "src/snippets") {
    this.template = template;
    this.folder = folder;
    this.outputWriter = outputWriter;
    this.folderLocation = path.join(root, folder);
    this.files = readdirSync(this.folderLocation);
    console.log(
      `[SnippetGenerator] Initialized for folder: ${this.folderLocation}`
    );
  }

  process() {
    this.files.forEach((file) => {
      const fileLocation = path.join(this.folderLocation, file);
      try {
        const content = readFileSync(fileLocation, "utf-8");
        const populatedTemplate = this.template.compile({
          title: file,
          content,
          language: this.folder,
        });

        const fileName = `${path.parse(file).name}.html`;
        this.filesRead.push({ title: file, url: fileName });
        this.outputWriter.write(fileName, populatedTemplate);
        console.log(
          `[SnippetGenerator] Processed: ${fileLocation} -> ${fileName}`
        );
      } catch (error) {
        console.error(error.message);
        console.error(
          `[SnippetGenerator] Failed to process "${fileLocation}": ${error.message}`
        );
      }
    });
  }

  get filesRead() {
    return this._filesRead;
  }
}

export default SnippetGenerator;
