import { describe, it, expect, vi } from "vitest";
import SnippetGenerator from "../../utils/SnippetGenerator.js";

describe("SnippetGenerator", () => {
  const mockTemplate = {
    compile: vi.fn(
      (context) =>
        `<html><head><title>${context.title}</title></head><body><p class="${context.language}">${context.content}</p></body></html>`
    ),
  };

  const outputWriter = {
    write: vi.fn((fileName, content) => null),
  };

  it("should generate filesRead", () => {
    const expectedFilesRead = [
      { title: "test_file.py", url: "test_file.html" },
    ];

    const generator = new SnippetGenerator(
      mockTemplate,
      "snippets",
      outputWriter,
      "src/test/"
    );

    generator.process();

    expect(generator.filesRead).toEqual(expectedFilesRead);
  });

  it("should call the template compile method with the correct context", () => {
    const generator = new SnippetGenerator(
      mockTemplate,
      "snippets",
      outputWriter,
      "src/test/"
    );

    generator.process();

    expect(mockTemplate.compile).toHaveBeenCalledWith({
      title: "test_file.py",
      content: 'print("Hello, world!")',
      language: "snippets",
    });

    expect(outputWriter.write).toHaveBeenCalledWith(
      "test_file.html",
      '<html><head><title>test_file.py</title></head><body><p class="snippets">print("Hello, world!")</p></body></html>'
    );
  });
});
