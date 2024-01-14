# Routes Schematic Builder
This tool will help you organize your backend very easily.
Also you can create all backend api files with just few entries in scheme!

## Example of building backend schematic
Create empty file just for init for example `init.js`.
```js
const RouteManager = require("./lib/creator");

new RouteManager().schematicBuilder.create("./routes", {
    user: {
        create: {
            method: "post",
            body: {
                email: { type: "string", },
                login: { type: "string", },
                password: { type: "string", minLength: 8, maxLength: 64 }
            }
        },
        delete: {
            method: "delete",
            body: {
                id: { type: "string" }
            }
        },
        get: {
            method: "get",
            query: {
                id: { type: "string" }
            }
        }
    }
})
```

That example schematic when run with `node init.js` will create properly prepared api files these files:
- `/routes/user/create.js`
- `/routes/user/delete.js`
- `/routes/user/get.js`

## Routes registration
To make your routes work we have to register it with just two lines of our library code. For better understanding we provide full code snippet with `express` package inside.

```js
const express = require("express");
const RouteManager = require("./lib/creator");

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

const manager = new RouteManager(app);

manager.initializer.init("v1", "./routes");
```

Yeah - that's it, you have all your backend files organized and registered! 🚀

Happy coding 🤗