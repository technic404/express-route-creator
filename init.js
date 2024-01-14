const RouteManager = require("./lib/creator");

/**
 * Example usage of schematic builder, just use `node init.js` to execute ^^
 */

new RouteManager().schematicBuilder.create("./routes", {
    user: {
        create: {
            method: "post",
            body: {
                email: {
                    type: "string",
                    minLength: 10,
                    maxLength: 30
                },
                login: {
                    type: "string",
                    minLength: 10,
                    maxLength: 20
                },
                password: {
                    type: "string",
                    minLength: 8,
                    maxLength: 64
                }
            },
            query: {
                proxy: {
                    type: "string",
                    length: 16
                }
            }
        },
        edit: {
            method: "post",
            body: {
                id: {
                    type: "string"
                },
                login: {
                    type: "string"
                },
                email: {
                    type: "string"
                }
            }
        },
        delete: {
            method: "delete",
            body: {
                id: {
                    type: "string"
                }
            }
        },
        getAll: {
            method: "get"
        },
        get: {
            method: "get",
            query: {
                id: {
                    type: "string"
                }
            }
        }
    }
})