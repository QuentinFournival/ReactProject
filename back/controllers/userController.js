const { crypt, cryptCompare } = require("../config/bcrypt");
const { createToken } = require("../config/jsonWebToken");
const bcrypt = require("bcrypt");
const UserModel = require("../domain/schemas/userSchema");
const ObjectID = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const { transporter } = require("../config/nodemailer");
const nodemailer = require("nodemailer");
const EntiteModel = require("../domain/schemas/entiteSchema");


module.exports = {
	// Method: Create a User in DB + Send a validation email
	// Paramaters: Object User Model
	// Return: Status(200) || error

	async createUser(req, res) {
		const userexist = await UserModel.findOne({ email: req.body.email });
		// Async+Await car 'email: req.body.email' n'est pas encore définit dans la fonction 'New UserModel'
		if (userexist != null) {
			res.status(400).send("Utilisateur déjà enregistré");
		} else {
			const newUser = new UserModel({
				name: req.body.name,
				firstname: req.body.firstname,
				email: req.body.email,
				password: await crypt(req.body.password),
				city: req.body.city,
				phone: req.body.phone,
				codePostal: req.body.codePostal,
			});

			if (req.body.confPassword != req.body.password) {
				console.log("Mots de passe differents")
			} else {
				newUser.save(async (err, user) => {
					if (err) {
						console.log(err);
					} else {
						res.status(200).send("Utilisateur enregistré: " + newUser);

						async function mailing() {
							let transporter = nodemailer.createTransport({
								host: "ssl0.ovh.net",
								port: 587,
								secure: false,
								auth: {
									user: process.env.MAILING_ADRESS,
									pass: process.env.PASSWORD_MAIL,
								},
							});

							let info = await transporter.sendMail({
								from: '"Kevin Maillard" <kevin.maillard@blublod.com>',
								to: `${newUser.email}`,
								// bcc: "kemaillard@gmail.com",
								subject: "Test",
								// text: "Hello World!!!",
								html: `<b>Bonjour</b> ${newUser.firstname}<a> </a> ${newUser.name} <b>, bienvenue sur BluBlod 😎
								Veuillez cliquer sur ce lien: <a href='http://localhost:3000/verifymail/${newUser._id}'> le lien</a></b>`,
								attachments: [
									{
										filename: "Parrot.png",
										path: "./test/Parrot.png",
									},
								],
							});

							console.log("Message envoyé :", info.messageId);
						}

						mailing();
						
		
					}
				});
			}
		}
	},

	// Method: Log User
	// Paramaters: Object User Model(email:string & password:string & User:_id)
	// Return: Status(200) + Token || error

	async login(req, res) {
		if (req.body.email) {
			const userByEmail = await UserModel.findOne({
				email: req.body.email,
			});
			if (userByEmail != undefined) {
				if (userByEmail.emailValidation == false) {
					console.log("You shall not pass !!");
					res.status(400).send("Veuillez valider votre compte");
				} else {
					if (req.body.password) {
						await bcrypt.compare(
							req.body.password,
							userByEmail.password,
							(err, same) => {
								if (err) {
									res.status(500).send({
										message:
											"Une erreur est survenue, veuillez vérifier que tous les champs sont correctement remplis. Si l'erreur persiste, veuillez contacter votre administrateur",
									});
								} else if (same) {
									userByEmail.save((err, user) => {
										if (err) {
											res.status(500).send(
												"Une erreur est survenue lors de la connexion"
											);
										} else {
											const token = jwt.sign(
												userByEmail._id.toJSON(),
												process.env.TOKEN_SECRET
											);
											res.status(200).send({
												accessToken: token,
											});
										}
									});
								} else {
									res.status(400).send({
										message:
											"La comparaison de mot de passe a échoué, êtes vous sûr d'avoir rentré le bon?",
									});
								}
							}
						);
					} else {
						res.status(400).send({
							message: "Veuillez entrer un mot de passe",
						});
					}
				}
			} else {
				res.status(401).send({
					message: "Pas d'utilisateur connu avec cette adresse mail",
				});
			}
		}
	},

	// Method: Query all users from Collection 'users'
	// Paramaters: Object User Model
	// Return: Status(200) || error

	async getUserConnected(req, res) {
		const users = await UserModel.find({_id: req.user.id});
		if (users.length == 0) {
			console.log("Tiens donc, il n'y personne par ici ...");
		} else {
			res.status(200).json(users);
		}
	},

	// Method: Update User info
	// Paramaters: Object User Model(Name:String & FirstName: String)
	// Return: user | error

	// ⚠️ ERREUR NON GÉRÉE ! (voir avec LF) + await/async? ⚠️
	updateInfoUserConnected(req, res) {
		// Verify if ObjectID match an ID in DB
		if (!ObjectID.isValid(req.user.id))
			return res.status(400).send("ID unknown : " + req.user.id);
		else {
			UserModel.findOneAndUpdate(
				{ _id: req.user.id },
				{
					$set: {
						name: req.body.name,
						firstname: req.body.firstname,
						codePostal: req.body.codePostal,
						city: req.body.city,
						phone: req.body.phone
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
	},

	// Method: Delete a User in DB
	// Paramaters: Object User Model (User:_id)
	// Return: Status(200) || error

	async deleteUser(req, res) {
		const userToRemove = await UserModel.findById(req.user.id);
		if (!userToRemove) {
			return res.status(404).send("ID unknow : " + req.user.id);
		} else {


			userToRemove.remove(); //UserModel.deleteOne({ _id: req.user.id }).exec();
			res.status(200).send({ message: "successfully deleted. " });
		}
	},

	// Method: Logout the User in DB by deleting the Token
	// Paramaters:
	// Return: Redirect "/"

	logout(req, res) {
		res.cookie("jwt", "", { maxAge: 1 });
		res.redirect("/");
	},

	//Method :  Validate the User's Email by turning "emailValidation" to true
	//Parameters: Object UserModel.emailValidation
	//Return : Turn boolean emailValidation on "True"
	verifyEmail(req, res) {
		if (!ObjectID.isValid(req.params.id))
			return res.status(400).send("ID unknown : " + req.params.id);
		else {
			UserModel.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						emailValidation: true,
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
	},

	//Method :  Send an Email to the user with a Unique URL to "UpdatePassword" function.
	//Parameters: Object UserModel
	//Return : status (200). (Email content)
	async mailResetPassword(req, res) {
		const userByEmail = await UserModel.findOne({ email: req.user.email });
		if (!userByEmail) {
			res.status(400).send("Email inconnu");
		} else {
			const token = jwt.sign(
				userByEmail._id.toJSON(),
				process.env.TOKEN_SECRET
			);
			userByEmail.resetPass.push(token);

			let transporter = nodemailer.createTransport({
				host: "ssl0.ovh.net",
				port: 587,
				secure: false,
				auth: {
					user: process.env.MAILING_ADRESS,
					pass: process.env.PASSWORD_MAIL,
				},
			});

			let info = await transporter.sendMail({
				from: '"Kevin Maillard" <kevin.maillard@blublod.com>',
				to: req.user.email,
				subject: "Reinitialisation de mot de passe",
				// text: "Hello World!!!",
				html: `<b>Bonjour</b> ${userByEmail.firstname}<a> </a> ${userByEmail.name} <b>,
					Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe: <a href='http://localhost:8000/forgot/${token}'> le lien</a></b>`,
			});
			console.log(userByEmail);

			userByEmail.save((err, data) => {
				if (err) {
					res.status(400).send(err);
				} else {
					res.status(200).send("Mail envoyé");
				}
			});
		}
	},

	//Method : Update the field 'password' in user account
	//Parameters: Object UserModel.password
	//Return : status (200)
	async updatePassword(req, res) {
		UserModel.findOneAndUpdate(
			{
				resetPass: req.body.resetPass,
			},
			{
				$set: {
					password: await crypt(req.body.newPassInput),
				},
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true },

			(err, data) => {
				if (!err) {
					res.status(200).send("MaJ de MdP OK");
				} else {
					console.log("erreur Maj de MdP");
					res.status(400).send(err);
				}
			}
		);
	},
	//################################################################################
	// ☝🏼 Verification à ajouter à "UpdatePassword"
	// 	// champs pas vides **
	// 	// if (req.body.newPassInput == null && req.body.newPassInput == undefined) {
	// 	// 	res.status(400).send("Veuillez remplir les champs précedents")

	// 	// Nouveau MdP = conf MdP **
	// 	// } else if (req.body.newPassInput != req.body.newPassConfInput) {
	// 		res.status(400).send("Mot de passe non similaire");

	// 		// Nouveau Mdp soit diff de l'ancien **
	// 	} else if (req.body.newPassInput == userById.password) {
	// 		res.status(400).send(
	// 			"Veuillez entrer un mot de passe different de l'ancien"
	// 		);
	//################################################################################

	//Method :  Send an Email to the user with a Unique URL to "resetEmail" function.
	//Parameters: Object UserModel
	//Return : status (200)
	async mailResetEmail(req, res) {
		const userById = await UserModel.findOne({ _id: req.params.id });

		if (!ObjectID.isValid(req.params.id)) {
			return res.status(400).send("ID unknown : " + req.params.id);
		} else {
			if (req.body.password) {
				await bcrypt.compare(
					req.body.password,
					userById.password,
					(err, same) => {
						if (err) {
							res.status(400).send("Mot de passe incorrect");
						} else if (same) {
							const token = jwt.sign(
								userById._id.toJSON(),
								process.env.TOKEN_SECRET
							);
							userById.resetEmail.push(token);

							let transporter = nodemailer.createTransport({
								host: "ssl0.ovh.net",
								port: 587,
								secure: false,
								auth: {
									user: process.env.MAILING_ADRESS,
									pass: process.env.PASSWORD_MAIL,
								},
							});

							let info = transporter.sendMail({
								from: '"Kevin Maillard" <kevin.maillard@blublod.com>',
								to: req.body.email,
								subject: "Reinitialisation de l'adresse email",
								// text: "Hello World!!!",
								html: `<b>Bonjour</b> ${userById.firstname}<a> </a> ${userById.name} <b>,
						Veuillez cliquer sur ce lien pour réinitialiser votre email: <a href='http://localhost:8000/changemail/${token}'> le lien</a></b>`,
							});

							userById.save((err, data) => {
								if (err) {
									res.status(400).send(err);
								} else {
									res.status(200).send("Mail envoyé");
								}
							});
						}
					}
				);
			}
		}
	},

	//Method : Update the field 'email' in user account
	//Parameters: Object UserModel
	//Return : status (200)
	resetEmail(req, res) {
		UserModel.findOneAndUpdate(
			{
				resetEmail: req.body.resetEmail,
			},
			{
				$set: {
					email: req.body.newEmail,
				},
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true },

			(err, data) => {
				if (!err) {
					res.status(200).send("MaJ Email OK");
				} else {
					console.log("erreur Maj Email");
					res.status(400).send(err);
				}
			}
		);
	},
};