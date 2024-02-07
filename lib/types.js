/**
 * @typedef {object} RouteBuilderSettingsPack
 * @property {"string"|"number"|"json"|"any"} [type]
 * @property {number} [length]
 * @property {number} [maxLength]
 * @property {number} [minLength]
 * @property {number} [maxValue]
 * @property {number} [minValue]
 * @property {boolean} [onlyLatinCharacters]
 * @property {boolean} [onlyLatinCharactersAndNumbers]
 */

/**
 * @typedef {Object.<string, RouteBuilderSettingsPack>} RouteBuilderSettingsKV
 */

/**
 * @typedef {object} RouteBuilderSettings
 * @property {RouteBuilderSettingsKV} [query]
 * @property {RouteBuilderSettingsKV} [body]
 */

/**
 * @typedef {Object.<string, Object.<string, { method: RouteRequestMethod, query?: RouteBuilderSettingsKV, body?: RouteBuilderSettingsKV }>>} RouteSchematic
 */

/**
 * @typedef {"post"|"get"|"delete"|"none"} RouteRequestMethod
 */