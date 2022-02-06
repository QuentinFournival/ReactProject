
const UserModel = require("../domain/schemas/userSchema");
const jwt = require("jsonwebtoken");

module.exports = {

    //Method :  to check a connection token and set the req.user
	//Parameters header: "Authorization : validJwTToken"
	//Return :  req.user
	//MiddleWare

	async verifToken(req, res, next) {
		const headerAuth = await req.header("Authorization");
		const token = (await headerAuth) && headerAuth.split(" ")[1];
		if (token == undefined || token == "" || token == null) {
			//   console.log('Token invalide ou absent'+ err)
			res.status(401).send({
				message: "Une authentification est nécessaire",
			});
		} else {
			jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
				if (err) {
					//   console.log(err);
					res.status(500).send({
						message:
							"Une erreur est survenue, veuillez réessayer ultérieurement. Si l'erreur persiste, veuillez contacter votre administrateur",
					});
				} else {
					const connectedUser = await UserModel.findById(user);
					req.user = connectedUser;
					next();
				}
			});
		}
	},


}