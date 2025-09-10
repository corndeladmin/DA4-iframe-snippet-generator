import { describe, it, expect, afterEach, afterEach } from "vitest";
import DirectoryWriter from "../../utils/DirectoryWriter.js";
import { existsSync, readFileSync, rmSync } from "fs";
import path from "path";

describe("DirectoryWriter", () => {
  afterEach(() => {
    const dirPath = path.join("src/test", "testDir");
    if (existsSync(dirPath)) {
      rmSync(dirPath, { recursive: true, force: true });
    }
  });

  it("should create a directory and write a file", () => {
    const directoryWriter = new DirectoryWriter("testDir", "src/test/");
    directoryWriter.write("testFile.txt", "This is a test file.");
    const dirPath = path.join("src/test", "testDir");
    const filePath = path.join(dirPath, "testFile.txt");
    const dirExists = existsSync(dirPath);
    const fileExists = existsSync(filePath);
    const fileContents = readFileSync(filePath, "utf8");
    expect(dirExists).toBeTruthy(true);
    expect(fileExists).toBe(true);
    expect(fileContents).toBe("This is a test file.");
  });

  it("should handle already existing directory", () => {
    const directoryWriter = new DirectoryWriter("testDir", "src/test/");
    expect(() => {
      new DirectoryWriter("testDir", "src/test/");
    }).not.toThrow();
  });

  it("should handle file writing errors", () => {
    const directoryWrite = new DirectoryWriter("testDir", "src/test/");
    expect(() => {
      directoryWrite.write("", "");
    }).toThrow();
  });
  
});
