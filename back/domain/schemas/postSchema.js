const bdd = require("../data/dbconnect");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PostSchema = new schema(
	{
        author: { type: schema.Types.ObjectId, ref:"UserModel", required: true},
        codePostal: { type: String, required: true },
        categorie: { type: schema.Types.ObjectId, ref:"categories" } ,
        titre: { type: String, required: true },
        description: { type: String, required: true },
        prix: { type: Number, required: true },
        statusValidate : {type : Boolean, default: false, required: true},
        statusSold : {type : Boolean, default: false, required: true},
		picture: [],
		cloudinary_id: { type: String },
	},
	{
		timestamps: true,
	}
);

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
