const fs = require('fs');
const path = require('path');

/**
 * Gets recursively files
 * @param {string} dir directory for scan
 * @param {string} filter extension to filter out the files
 * @returns {string[]} relative path of files
 */
function getFiles(dir, filter = "") {
    const files = [];

    fs.readdirSync(dir).forEach((file) => {
        const absolutePath = path.join(dir, file);
        const isDirectory = fs.statSync(absolutePath).isDirectory();

        if (!isDirectory && !file.endsWith(filter)) return;

        files.push(
            isDirectory
                ? getFiles(absolutePath, filter)
                : absolutePath
        );
    });

    return files.flat();
}

/**
 * Removes extension from file
 * @param {string} filePath path of the file
 * @returns {string} file name
 */
function removeExtension(filePath) {
    return path.parse(path.basename(filePath)).name;
}

module.exports = {
    removeExtension,
    getFiles
}