const RouteInitializer = require("./modules/RouteInitializer");

class RouteManager {
    /**
     * 
     * @param {import("express").Express} app 
     */
    constructor(app) {
        this.initializer = new RouteInitializer(app);
    }
}

module.exports = RouteManager;