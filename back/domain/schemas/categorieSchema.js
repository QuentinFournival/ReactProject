const bdd = require("../data/dbconnect");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CategorieSchema = new schema(
    {
        name: { type: String, required: true },
    }

)

const CategorieModel = mongoose.model("categories", CategorieSchema);

module.exports = CategorieModel;