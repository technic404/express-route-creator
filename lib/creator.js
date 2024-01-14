const RouteInitializer = require("./modules/RouteInitializer");
const RoutesSchematicBuilder = require("./modules/RoutesSchematicBuilder");

class RouteManager {
    /**
     * 
     * @param {import("express").Express} app 
     */
    constructor(app = null) {
        this.initializer = new RouteInitializer(app);
        this.schematicBuilder = new RoutesSchematicBuilder();
    }
}

module.exports = RouteManager;