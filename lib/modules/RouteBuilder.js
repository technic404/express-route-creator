

class RouteBuilder {
    postExec = () => {};
    getExec = () => {};
    deleteExec = () => {};
    /**
     * @type {"none"|"post"|"get"|"delete"}
     */
    method = "none";
    /**
     * @type {RouteBuilderSettings}
     */
    schematic = {
        query: {},
        body: {}
    };

    constructor() { }

    /**
     * 
     * @param {RouteBuilderSettings} schematic
     * @returns {RouteBuilder}
     */
    setSchematic(schematic) {
        this.schematic = schematic;

        return this;
    }

    /**
     * 
     * @param {function(import("express").Request, import("express").Response)} func 
     * @returns {RouteBuilder}
     */
    post(func = (req, res) => {}) {
        this.method = "post";
        this.postExec = func;
        
        return this;
    }

    /**
     * 
     * @param {function(import("express").Request, import("express").Response)} func 
     * @returns {RouteBuilder}
     */
    get(func = (req, res) => {}) {
        this.method = "get";
        this.getExec = func;
        
        return this;
    }

    /**
     * 
     * @param {function(import("express").Request, import("express").Response)} func 
     * @returns {RouteBuilder}
     */
    delete(func = (req, res) => {}) {
        this.method = "delete";
        this.deleteExec = func;
        
        return this;
    }
}

module.exports = RouteBuilder;