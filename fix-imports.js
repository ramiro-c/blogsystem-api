const fs = require("fs");
const path = require("path");

// Directory to scan for TypeScript files
const srcDir = path.join(__dirname, "src");

// Function to add .js extensions to relative imports
function fixImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Regex to match import statements with relative paths without extensions
  const importRegex = /from\s+['"](\.[^'"]*)['"]/g;

  // Replace imports with .js extension if they don't already have an extension
  const updatedContent = content.replace(importRegex, (match, importPath) => {
    // Skip if the import already has an extension
    if (path.extname(importPath)) {
      return match;
    }
    return `from '${importPath}.js'`;
  });

  // Write the updated content back to the file
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Fixed imports in: ${path.relative(__dirname, filePath)}`);
  }
}

// Function to recursively scan directory for TypeScript files
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      fixImports(fullPath);
    }
  }
}

// Start the process
console.log("Fixing imports in TypeScript files...");
scanDirectory(srcDir);
console.log("Done!");
