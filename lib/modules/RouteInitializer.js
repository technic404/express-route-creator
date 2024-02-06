const express = require('express');
const { removeExtension, getFiles } = require('../utils/files');
const path = require('path')
const RouteBuilder = require("./RouteBuilder");

class RouteInitializer {
    /**
     * 
     * @param {import("express").Express} app 
     */
    constructor(app) {
        this.app = app;
    }


    /**
     * 
     * @param {String} apiPrefix 
     * @param {String} directory 
     */
    init(apiPrefix, directory) {
        if(!this.app) return console.error(`Cannot use RouteInitializer.init() method when app param was not provided`);

        const Colors = { None: "\x1b[0m", Bright: "\x1b[1m", Dim: "\x1b[2m", Underscore: "\x1b[4m", Blink: "\x1b[5m", Reverse: "\x1b[7m", Hidden: "\x1b[8m",Black: "\x1b[30m", Red: "\x1b[31m", Green: "\x1b[32m", Yellow: "\x1b[33m", Blue: "\x1b[34m", Magenta: "\x1b[35m", Cyan: "\x1b[36m", White: "\x1b[37m" }

        const V_PREFIX = `${Colors.Black}[${Colors.Green}${Colors.Underscore}Routes${Colors.Black}]${Colors.None} `;
        const X_PREFIX = `${Colors.Black}[${Colors.Red}${Colors.Underscore}Routes${Colors.Black}]${Colors.None} `;
    
        if(!apiPrefix.startsWith("/")) apiPrefix = `/${apiPrefix}`;

        const routes = getFiles(directory);
    
        for(const route of routes) {
            /**
             * @type {RouteBuilder}
             */
            const routeBuilder = require(`../../${route}`);
            const routeDirectory = path.basename(path.dirname(route));
            const fileNameWithoutExtension = removeExtension(route);
            const router = express.Router();
    
            /**
             * 
             * @param {RouteBuilderSettings} schematic
             * @param {import("express").Request} req 
             * @param {import("express").Response} res 
             * @returns {{ error: boolean, message: string|null }} if success or not
             */
            const analyzeSchematic = (schematic, req, res) => {
                /**
                 * 
                 * @param {string} param
                 * @param {string} value
                 * @param {RouteBuilderSettingsPack} obj 
                 * @returns {{ error: boolean, message: string|null }}
                 */
                const analyzePropertieses = (param, value, obj) => {
                    if("type" in obj) {
                        if(obj.type === "string" && !isNaN(value)) return { error: true, message: `Param "${param}" has to be string` }
                        if(obj.type === "number" && isNaN(value)) return { error: true, message: `Param "${param}" has to be number` }
                    }
    
                    if("length" in obj) {
                        if(value.length !== obj.length) return { error: true, message: `Param "${param}" must have length of ${obj.length} characters` }
                    }
    
                    if("maxLength" in obj) {
                        if(value.length > obj.maxLength) return { error: true, message: `Param "${param}" must have maximum length of ${obj.maxLength} characters` }
                    }
    
                    if("minLength" in obj) {
                        if(value.length < obj.minLength) return { error: true, message: `Param "${param}" must have minimum length of ${obj.minLength} characters` }
                    }
    
                    if("maxValue" in obj) {
                        if(parseInt(value) > obj.maxValue) return { error: true, message: `Param "${param}" must have maximum value of ${obj.maxValue}` }
                    }
    
                    if("minValue" in obj) {
                        if(parseInt(value) < obj.minValue) return { error: true, message: `Param "${param}" must have minium value of ${obj.maxValue}` }
                    }
    
                    if("onlyLatinCharacters" in obj) {
                        const latinCharacters = [
                            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                            "A", "B", "V", "F", "E", "G", "H", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
                        ];
    
                        for(const char of value) {
                            if(!latinCharacters.includes(char)) return { error: true, message: `Param "${param}" has to include only latin characters` }
                        }
                    }
    
                    if("onlyLatinCharactersAndNumbers" in obj) {
                        const latinCharactersAndNumbers = [
                            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                            "A", "B", "V", "F", "E", "G", "H", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
                        ];
    
                        for(const char of value) {
                            if(!latinCharactersAndNumbers.includes(char)) return { error: true, message: `Param "${param}" has to include only latin characters or numbers` }
                        }
                    }
    
                    return { error: false, message: null };
                }
    
                const datas = [{ name: "query", data: req.query }, { name: "body", data: req.body }];
    
                for(const data of datas) {
                    if(!(data.name in schematic)) continue;
    
                    for(const [key, value] of Object.entries(schematic[data.name])) {
                        if(!(key in data.data)) return { error: true, message: `Param "${key}" is not present in ${data.name}` }
                        
                        const result = analyzePropertieses(key, data.data[key], value);
    
                        if(result.error) return result;
                    }
                }
    
                return { error: false, message: null };
            }
    
            /**
             * 
             * @param {import("express").Request} req 
             * @param {import("express").Response} res 
             * @param {import("express").NextFunction} next 
             */
            const paramsValidatorFunction = (req, res, next) => {
                const result = analyzeSchematic(routeBuilder.schematic, req, res);
    
                if(result.error) {
                    return res.status(400).json({ error: result.error, message: result.message });
                }
    
                next();
            }
    
            switch(routeBuilder.method) {
                case "post": router.post("/", paramsValidatorFunction, routeBuilder.postExec); break;
                case "get": router.get("/", paramsValidatorFunction, routeBuilder.getExec); break;
                case "delete": router.delete("/", paramsValidatorFunction, routeBuilder.deleteExec); break;
                default: return console.error(`${X_PREFIX}Invalid method, expected post/get/delete`);
            }
    
            const apiUrl = `${apiPrefix}/${routeDirectory}/${fileNameWithoutExtension}`;
    
            this.app.use(apiUrl, router);
    
            console.log(`${V_PREFIX}Registered route ${Colors.Green}${apiUrl}${Colors.None} (${routeBuilder.method.toUpperCase()})`)
        }
    }
}

module.exports = RouteInitializer;