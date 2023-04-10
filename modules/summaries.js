const ignorePattern = ['node_modules/**/*'];
const fs = require('fs');
const fg = require('fast-glob');
const path = require('path');

const types = {
  FileObject: {
    path: "string",
    code: "string",
  },
};

/**
 * @param {FileObject[]} files - An array of file objects, each with a `path` property.
 * @returns {FileObject[]} - An array of file objects, each with a `path` property and a `code` property containing the file's contents.
 */
function getFiles(files){
  retFiles=[]
  for (const file of files) {
    const pathToFile = file.path;
    const fileContent = fs.readFileSync(pathToFile, 'utf8');
    file.code = fileContent
    retFiles.push(file)
  }
  return retFiles
}

// Gets all .ai.txt files (summaries)
async function readAllSummaries() {
    var files = [];
    try {
      console.log("Getting Summary");
      files = await fg(path.posix.join(process.env.CODE_DIR, '**/*.ai.txt'), { ignore: ignorePattern });
    } catch (err) {
      console.error("Error in fast-glob:", err);
      throw err;
    }

    if (files.length === 0) {
      console.log("No matching files found. Try running `node createSummaryOfFiles` first.");
      throw new Error("Can not run without Summaries. Try running `node createSummaryOfFiles` first.");
    }

    let summaries = "";
    console.log("Files found:", files);
    for (const file of files) {
      try {
        const summary = fs.readFileSync(file, 'utf-8');
        summaries += summary + '\n\n';
      } catch (error) {
        console.error("Error reading file:", file, error);
      }
    }
    return summaries;
}

module.exports = {
    readAllSummaries,
    getFiles,
    types
}