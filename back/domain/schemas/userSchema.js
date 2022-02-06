const bdd = require("../data/dbconnect");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
	{
		name: { type: String, required: true },
		firstname: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		codePostal: { type: String, required: true },
		city: { type: String, required: true },
		phone: { type: String, required: true},
		admin: { type: Boolean, default: false },
		annonces: [ { type: schema.Types.ObjectId, ref:"posts" } ],
		emailValidation : {type : Boolean, default: false, required: true},
		resetPass : [],
		resetEmail : [],
		entiteAdmin: { type: Boolean, default: false },
		entite: { type: schema.Types.ObjectId, ref:"entites" },

	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
