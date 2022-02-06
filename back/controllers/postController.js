const ObjectId = require("mongoose").Types.ObjectId;
const PostModel = require("../domain/schemas/postSchema");
const UserModel = require("../domain/schemas/userSchema");
const CategorieModel = require("../domain/schemas/categorieSchema");
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");

module.exports = {
	// Method: Query posts that are Validated from collection 'posts'
	// Paramaters: Object Post Model
	// Return: Status(200)

	async readValidatedPost(req, res) {
		const posts = await PostModel.find({ author: req.user.id });
		if (posts.length == 0) {
			console.log("Tiens donc, il n'y personne par ici ...");
		} else {
			res.status(200).json(posts);
		}
	},

	// Method: Query a specific from collection 'posts'
	// Paramaters: Object Post Model
	// Return: Status(200)

	async getPost(req, res) {
		const posts = await PostModel.findOne({ _id: req.params.id }).populate(
			"categorie",
			"name"
		);
		if (posts.length == 0) {
			console.log("Tiens donc, il n'y personne par ici ...");
		} else {
			res.status(200).json(posts);
		}
	},

	// Method: Create a post in collection 'posts'
	// Paramaters: Object Post Model (codePostal:Number & categorie:String & titre:String & description:String & prix:Number) + UserModel.email
	// Return: Status(200) || error

	// ⚠️ Ne permet pas d'upload Plusieurs images à la fois. Mais stock l'image dans un array

	async createPost(req, res) {
		const User = await UserModel.findOne({ email: req.user.email });
		let result;

		if (req.file !== undefined) {
			result = await cloudinary.uploader.upload(req.file.path);
		}

		const newPost = new PostModel({
			author: User._id,
			codePostal: req.body.codePostal,
			categorie: req.body.categorie,
			titre: req.body.titre,
			description: req.body.description,
			prix: req.body.prix,
			picture:
				req.file !== undefined
					? result.secure_url
					: "https://res.cloudinary.com/dglsnqsmg/image/upload/v1638261639/no-image_obibjq.png",
			cloudinary_id: req.file !== undefined ? result.public_id : "",
		});

		newPost.save(async (err, post) => {
			if (err) {
				console.log(err);
			} else {
				User.annonces.push(post._id);
				res.status(200).send(newPost);

				// Ajoute l'annonce à l'utilisateur
				await User.save((err, data) => {
					if (err) {
						res.status(500).send(err);
					} else {
					}
				});
			}
		});
	},

	// Method: Update a post in collection 'posts'
	// Paramaters: Object Post Model (codePostal:Number & categorie:String & titre:String & description:String & prix:Number)
	// Return: Status(200) || error

	// Upload picture ne fonctionne pas >> MaJ new pic impossible
	async updatePost(req, res) {
		// Mettre votre objet dans une const avant de l'utiliser dans un if, c'est plus propre et plus facile à récupérer, et plus lisible aussi

		if (!ObjectId.isValid(req.params.id))
			return res.status(400).send("ID unknown : " + req.params.id);
		else {
			PostModel.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						codePostal: req.body.codePostal,
						categorie: req.body.categorie,
						titre: req.body.titre,
						description: req.body.description,
						prix: req.body.prix,
						statusValidate: false,

						picture:
							req.file !== undefined
								? result.secure_url
								: "https://res.cloudinary.com/dglsnqsmg/image/upload/v1638261639/no-image_obibjq.png",

						cloudinary_id:
							req.file !== undefined ? result.public_id : "",
					},
				},
				{ new: true, upsert: true, setDefaultsOnInsert: true },

				(err, data) => {
					if (!err) {
						// const dataPicture = data.picture;
						console.log("MaJ OK test");
						// console.log(dataPicture)
						// dataPicture.length = 0;
						// dataPicture.push("blablabla")
						// console.log(data.picture)
						// dataPicture.push(req.file !== undefined
						// 	? result.secure_url
						// 	: "https://res.cloudinary.com/dglsnqsmg/image/upload/v1638261639/no-image_obibjq.png",
						// )
						return res.send(data);
					} else {
						console.log("erreur test");
						return res.send(err);
					}
				}
			);
		}
	},

	// Method: Delete a post in collection 'posts'
	// Paramaters: Object Post Model (post _id: ID)
	// Return: Status(200) || error

	async deletePost(req, res) {
		// Mettre votre objet dans une const avant de l'utiliser dans un if, c'est plus propre et plus facile à récupérer, et plus lisible aussi
		if (!ObjectId.isValid(req.params.id))
			return res.status(400).send("ID unknown : " + req.params.id);
		else {
			const users = await UserModel.find({ annonces: req.params.id });
			const post = await PostModel.findOne({ _id: req.params.id });

			//Delete l'id du post de l'array du User
			for (let user of users) {
				const index = user.annonces.indexOf(req.params.id);
				user.annonces.splice(index, 1);
				user.save((err, data) => {
					if (err) {
						res.status(500).send({
							message:
								"Une erreur est survenue lors de la mise à jour de votre liste d'annonces",
						});
					}
				});
			}
			//Delete la photo du post sur Cloudinary
			cloudinary.uploader.destroy(`${post.cloudinary_id}`);
			//Delete le post de la collection 'post'
			PostModel.deleteOne({ _id: req.params.id }).exec();
			res.status(200).json({ message: "successfully deleted. " });
		}
	},

	// Method: turn the StatusValidate of the post to True collection 'posts'
	// Paramaters: Object Post Model (post _id: ID)
	// Return: Status(200) || error
	verifyPosts(req, res) {
		//Idem objet dans une constante avant de mettre dans un if
		if (!ObjectId.isValid(req.params.id))
			return res.status(400).send("ID unknown : " + req.params.id);
		else {
			PostModel.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						statusValidate: true,
					},
				},
				{ new: true, upsert: true, setDefaultsOnInsert: true },

				(err, data) => {
					if (!err) {
						console.log("Annonce validée");
						return res.status(200).send(data);
					} else {
						console.log("erreur de validation" + err);
						return res.status(400).send(err);
					}
				}
			);
		}
	},

	async UpdateStatusSoldAndDeletePost(req, res) {
		const Post = await PostModel.findById(req.params.id);
		const User = await UserModel.findOne({ email: req.user.email });
		console.log(req.user);
		if (Post == null) {
			res.status(400).send({
				message:
					"L'annonce n'est plus disponible ou a déjà été supprimée",
			});
		} else if (Post.statusSold == true) {
			res.status(400).send({
				message: "le statut de l'annonce a déjà été modifiée",
			});
		} else {
			Post.updateOne({ statusSold: true }, (err, data) => {
				if (err) {
					res.status(400).send({
						message:
							"Une erreure est survenue lors de la mise à jours du statut disponible de l'annonce",
					});
				}
			});

			const users = await UserModel.find({ annonces: req.params.id });
			for (let user of users) {
				const index = user.annonces.indexOf(req.params.id);
				user.annonces.splice(index, 1);
				user.save((err, data) => {
					if (err) {
						res.status(500).send({
							message:
								"Une erreur est survenue lors de la mise à jour de votre liste d'annonces",
						});
					}
				});
			}
			cloudinary.uploader.destroy(`${Post.cloudinary_id}`);
			Post.deleteOne({ _id: req.params.id });
			res.status(200).send({ message: "L'annonce a bien été supprimée" });
		}
	},
};
