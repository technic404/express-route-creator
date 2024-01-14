const RouteBuilder = require("../../lib/modules/RouteBuilder");

module.exports = new RouteBuilder()
.setSchematic({
    query: {
        id: {
            type: "number"
        }
    }
})
.get((req, res) => {
    const id = req.query.id;

    res.status(200).json({ msg: `Your id is ${id}` })
})