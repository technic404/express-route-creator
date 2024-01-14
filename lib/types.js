/**
 * @typedef {Object} RouteBuilderSettingsPack
 * @property {"string"|"number"} [type]
 * @property {number} [length]
 * @property {number} [maxLength]
 * @property {number} [minLength]
 * @property {number} [maxValue]
 * @property {number} [minValue]
 * @property {boolean} [onlyLatinCharacters]
 * @property {boolean} [onlyLatinCharactersAndNumbers]
 */

/**
 * @typedef {Object} RouteBuilderSettings
 * @property {Object.<string, RouteBuilderSettingsPack>} [query]
 * @property {Object.<string, RouteBuilderSettingsPack>} [body]
 */