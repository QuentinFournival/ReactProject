const bdd = require("../data/dbconnect");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const EntiteSchema = new schema(
    {
        name: { type: String, required: true },
        membres: [],
    }

)

const EntiteModel = mongoose.model("entites", EntiteSchema);

module.exports = EntiteModel;