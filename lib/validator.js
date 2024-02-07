/**
 * Checks if provided string is Json type
 * @param {string} string 
 * @returns {boolean}
 */
function isJson(string) {
    try {
        JSON.parse(string);
    } catch {
        return false
    }

    return true;
}

module.exports = {
    isJson
}