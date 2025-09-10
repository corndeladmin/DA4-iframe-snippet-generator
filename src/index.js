import { readdirSync } from "fs";
import path from "path";
import "dotenv/config";
import DirectoryWriter from "./utils/DirectoryWriter.js";
import Template from "./utils/Template.js";
import SnippetGenerator from "./utils/SnippetGenerator.js";

const codeSnippetTemplate = new Template("snippet.hbs");
const snippetsDirectory = path.join("src", "snippets");
const publicWriter = new DirectoryWriter("public");
const filesCreated = [];
const files = readdirSync(snippetsDirectory);

const { GH_ORG, GH_REPOSITORY } = process.env;

if (!GH_ORG || !GH_REPOSITORY) {
  throw new Error("ORG and PROJECT must be set as environment variables");
}

files.forEach((file) => {
  const snippetGenerator = new SnippetGenerator(
    codeSnippetTemplate,
    file,
    publicWriter
  );
  snippetGenerator.process();
  snippetGenerator.filesRead.forEach((fileRead) => filesCreated.push(fileRead));
});

const summaryTemplateFiles = [
  { template: "index", payload: { filesCreated } },
  {
    template: "iframes",
    payload: { filesCreated, GH_ORG, GH_REPOSITORY },
  },
];

summaryTemplateFiles.forEach((file) => {
  const template = new Template(`${file.template}.hbs`);
  const populatedTemplate = template.compile(file.payload);
  publicWriter.write(`${file.template}.html`, populatedTemplate);
});
