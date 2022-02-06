const jwt = require("jsonwebtoken");

module.exports = {
	createToken(id) {
		const maxAge = 0.33 * 24 * 60 * 60 * 1000;

		return jwt.sign({ id }, process.env.TOKEN_SECRET, {
			expiresIn: maxAge,
		});
	},

	deleteToken(req, res) {
		res.cookie("jwt", "", { maxAge: 1 });
		res.redirect("/");
	},
};
