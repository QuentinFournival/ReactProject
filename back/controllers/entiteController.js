const EntiteModel = require("../domain/schemas/entiteSchema");
const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require("../domain/schemas/userSchema");

module.exports = {

	createEntite(req, res) {
		if (req.user.entiteAdmin == false || req.user.admin == true) {
			const newEntite = new EntiteModel({
				name: req.body.name,
                membres: req.user._id
			});
			console.log(newEntite);

			newEntite.save((err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(data);
				}
			});

            //Update le profil du User qui crée une entité
			UserModel.findOneAndUpdate(
				{ _id: req.user.id },
				{
					$set: {
						entiteAdmin: true,
                        entite: newEntite._id,
					},
				},
				{ new: true, upsert: true, setDefaultsOnInsert: true },

				(err, data) => {
					if (!err) {
						console.log("MaJ entiteAdmin OK");
					} else {
						console.log("Erreur MaJ entiteAdmin");
						return res.send(err);
					}
				}
			);

		} else {
			return res
				.status(400)
				.send(
					"Vous n'êtes pas un administrateur Blublod, ou vous possedez déjà une entité."
				);
		}
	},

	async getAllEntites(req, res) {
		if (req.user.admin == false)
			return res.status(400).send("Vous n'êtes pas un administrateur.");
		else {
			const ent = await EntiteModel.find();
			if (ent.length == 0) {
				console.log("Aucune entité à afficher");
				res.status(400).send("Pas d'entité à afficher");
			} else {
				res.status(200).send(ent);
				console.log(ent);
			}
		}
	},

	updateEntite(req, res) {
		if (req.user.admin == false)
			return res.status(400).send("Vous n'êtes pas un administrateur.");
		else {
			if (!ObjectID.isValid(req.params.id)) {
				return res.status(400).send("ID unknown : " + req.params.id);
			} else {
				EntiteModel.findByIdAndUpdate(
					{ _id: req.params.id },
					{
						$set: {
							name: req.body.name,
						},
					},
					{ new: true, upsert: true, setDefaultsOnInsert: true },

					(err, data) => {
						if (err) {
							console.log("Erreur MaJ Entité");
							res.status(400).send(err);
						} else {
							console.log("MaJ Entité OK");
							res.status(200).send(data);
						}
					}
				);
			}
		}
	},

	deleteEntite(req, res) {
		if (req.user.admin == false)
			return res.status(400).send("Vous n'êtes pas un administrateur.");
		else {
			if (!ObjectID.isValid(req.params.id)) {
				res.status(400).send("ID unknow : " + req.params.id);
			} else {
				EntiteModel.deleteOne({ _id: req.params.id }).exec();
				res.status(200).json({ message: "Entité supprimée" });
			}
		}
	},
};
