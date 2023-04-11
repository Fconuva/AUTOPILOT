const fs = require('fs');
const path = require('path');
const outputFolder = 'suggestions';
const logsDirectory = 'logs';
const logsExtension = '.txt';
const logsFilename = new Date().toISOString().replace(/:/g, '-')

/**
 * Returns the path of the log file.
 * @returns {string} The log file path.
 */
function logPath() {
    const logsDir = path.join(__dirname, '..' ,logsDirectory);
    const fileName = `${logsFilename}${logsExtension}`;
    return path.join(logsDir, fileName)
}

/**
Saves logs to the logs folder by appending the specified text to the end of the log file.
@param {string} text - The text to be added to the log file.
*/
function saveLog(text) {
    fs.appendFileSync(logPath(), `${text} \n\n*******\n\n`);
}

module.exports= {
    saveLog,
    logPath
}