const PostModel = require("../domain/schemas/postSchema");
const UserModel = require("../domain/schemas/userSchema");

module.exports = {
	setAdmin(req, res) {
		if (req.user.admin == false)
			return res.status(400).send("Vous n'êtes pas un administrateur.");
		else {
			UserModel.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						admin: true,
					},
				},
				{ new: true, upsert: true, setDefaultsOnInsert: true },

				(err, data) => {
					if (!err) {
						return res
							.status(200)
							.send(
								"L'utilisateur id: " +
									req.params.id +
									" est désormais un admin"
							);
					} else {
						return res.status(400).send(err);
					}
				}
			);
		}
	},

	async adminReadAllPosts(req, res) {
		if (req.user.admin == false)
			return res.status(400).send("Vous n'êtes pas un administrateur.");
		else {
			const posts = await PostModel.find();
			if (posts.length == 0) {
				console.log("Tiens donc, il n'y personne par ici ...");
			} else {
				res.status(200).json(posts);
			}
		}
	},

	adminUpdateNames(req, res) {
		if (req.user.admin == false)
			return res.status(400).send("Vous n'êtes pas un administrateur.");
		else {
			// Verify if ObjectID match an ID in DB
			if (!ObjectID.isValid(req.params.id))
				return res.status(400).send("ID unknown : " + req.params.id);
			else {
				UserModel.findOneAndUpdate(
					{ _id: req.params.id },
					{
						$set: {
							name: req.body.name,
							firstname: req.body.firstname,
						},
					},
					{ new: true, upsert: true, setDefaultsOnInsert: true },

					(err, data) => {
						if (!err) {
							console.log("MaJ OK test");
							return res.send(data);
						} else {
							console.log("erreur test");
							return res.send(err);
						}
					}
				);
			}
		}
	},

	async adminDeleteUser(req, res) {
		if (req.user.admin == false)
			return res.status(400).send("Vous n'êtes pas un administrateur.");
		else {
			const userToRemove = await UserModel.findById(req.params.id);
			if (!userToRemove) {
				return res.status(400).send("ID unknow : " + req.params.id);
			} else {
				userToRemove.remove(); //UserModel.deleteOne({ _id: req.params.id }).exec();
				res.status(200).send({ message: "successfully deleted. " });
			}
		}
	},
};
