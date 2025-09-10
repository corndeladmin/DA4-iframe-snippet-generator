import { describe, it, assert } from "vitest";
import Template from "../../utils/Template.js";

describe("Template", () => {
  it("should load and compile a template", () => {
    const template = new Template("test.hbs", "src/test/templates");
    const context = { title: "Test Title", content: "This is a test content." };
    const compiledTemplate = template.compile(context);

    const expectedOutput =
      `<html lang="en">\n` +
      `  <head>\n` +
      `    <meta charset="UTF-8" />\n` +
      `    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n` +
      `    <title>Test Title</title>\n` +
      `  </head>\n` +
      `  <body>\n` +
      `        <p>This is a test content.</p>\n` +
      `  </body>\n` +
      `</html>`;

    assert.strictEqual(compiledTemplate, expectedOutput);
  });

  it("should throw an error if template file does not exist", () => {
    assert.throws(() => {
      new Template("nonexistent.hbs", "src/test/templates");
    }, /Failed to load or compile template/);
  });

  it("should throw an error if template compilation fails", () => {
    const template = new Template("test.hbs", "src/test/templates");
    const missingContentContext = { title: "Test Title" };
    assert.throws(() => {
      template.compile(missingContentContext);
    }, /Failed to compile template with provided context/);
  });
});
