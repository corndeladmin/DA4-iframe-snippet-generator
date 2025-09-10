import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";

class Template {
  template;

  constructor(templateFile, root = "src/templates") {
    const templateFullPath = path.join(root, templateFile);
    try {
      const templateSource = readFileSync(templateFullPath, "utf8");
      this.template = Handlebars.compile(templateSource, { strict: true });
      console.log(`[Template] Loaded and compiled: ${templateFullPath}`);
    } catch (err) {
      throw new Error(
        `[Template] Failed to load or compile template "${templateFullPath}": ${err.message}`
      );
    }
  }

  compile(context) {
    try {
      const populatedTemplate = this.template(context);
      return populatedTemplate;
    } catch (err) {
      throw new Error(
        "[Template] Failed to compile template with provided context. Error: "
       + err.message);
    }
  }
}

export default Template;
