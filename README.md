# iframe-snippet-generator-template

A Node.js tool and **template repository** for generating syntax-highlighted HTML code snippets for use in RISE modules.

## Getting Started

This repository is a **template**. Please ignore if you have already completed this setup.
To use it for your own course:

1. **Click "Use this template"** on the GitHub page to create your own repository from this template.
2. **Clone your new repository** to your local machine.
3. **Create a `.env` file** in the root of your project with the following contents:
   ```
   GH_ORG=
   GH_REPOSITORY=
   ```
   Replace these values with the **organization** and **repository name** of the template you create.
4. **Follow the instructions below** to add your code snippets and build your site.

## How It Works

- Place formatted code files in `src/snippets/` (group by language).
- On build each file is converted to a standalone, syntax-highlighted (based on language) HTML snippet using Handlebars and [Highlight.js](https://highlightjs.org/).
- On build output is written to the `public/` directory, including an `index.html` and an `iframes.html` with ready-to-copy iframe tags.

## Contributing Snippets

_Do not delete existing snippets unless 100% sure as they are used in live modules._

1. **Create a branch** for your snippets.
2. **Add your code snippets** to `src/snippets/` (create a subfolder for your language if not already present).

- To view locally run `npm build` to generate `public`.

3. **Open a Pull Request** to `main`.

On merge, a **GitHub Action** will:

- Build the HTML output.
- Deploy the `public/` directory to the `gh-pages` branch.

Your snippets will then be available online for embedding in RISE modules.

## Project Structure

```
src/
  module-projects   # Store Specific Projects Related to Modules 
  snippets/         # Add your code files here
  templates/        # Handlebars templates
  utils/            # Build utilities
  index.js          # Main script for processing snippets
public/             # Generated HTML output (auto-deployed)
```

## Local Development

```sh
npm install
npm run build
```

## Testing

This project uses Vitest (https://vitest.dev/) for testing. To run tests:

```sh
npm test
```

---
