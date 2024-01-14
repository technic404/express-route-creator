const express = require("express");
const RouteManager = require("./lib/creator");

const PORT = 3004;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

const manager = new RouteManager(app);

manager.initializer.init("v1", "./routes");