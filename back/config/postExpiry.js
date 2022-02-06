const PostModel = require("../domain/schemas/postSchema");
const UserModel = require("../domain/schemas/userSchema");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const nodemailer = require("nodemailer");
const { db } = require("../domain/schemas/postSchema");

// Délai d'expiration du post
let expiryDelay = new Date().getTime() - 90 * 24 * 60 * 60 * 1000;
//                                        day hour  min  sec  msec

// INTERVAL ENTRE LES "60 & 61 jours" POUR L'ENVOI DE MAIL "unique"
let sendNoticeDelay = new Date().getTime() - 59 * 24 * 60 * 60 * 1000;
//                                        day hour  min  sec  msec
let sendNoticeDelayBis = new Date().getTime() - 60 * 24 * 60 * 60 * 1000;
//                                        day hour  min  sec  msec

module.exports = {
	async postExpiry(req, res) {
		const arrayPosts = await PostModel.find({ statusValidate: true });

		for (let i in arrayPosts) {
			// Si le post a dépassé le délai d'expiration
			if (arrayPosts[i].updatedAt < expiryDelay) {

			//Supprime l'annonce du l'array User.annonce
				//Identifie le User à l'origine de l'Annonce
				const user = await UserModel.find({
					annonces: arrayPosts[i]._id,
				});


				// Supprime l'annonce de l'array Annonce du user
				const index = user[0].annonces.indexOf(arrayPosts[i]._id);
				console.log(user[0].annonces);
				user[0].annonces.splice(index, 1);
				console.log(user[0].annonces);

				await user.save((err, data ) => {
					if(!err){
						console.log('ok')
					} else {
						console.log('pas ok' + err)
					}
				});


				// Supprime le post de la collection 'posts'
				PostModel.deleteOne({ _id: arrayPosts[i]._id }).exec();

				console.log(
					"L'annonce ID: " +
						arrayPosts[i]._id +
						" a été supprimée de la BDD"
				);
			}
			// Si le post est compris dans l'interval de date
			else if (
				arrayPosts[i].updatedAt <= sendNoticeDelay &&
				arrayPosts[i].updatedAt >= sendNoticeDelayBis
			) {
				const user = await UserModel.find({
					annonces: arrayPosts[i]._id,
				});

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
						from: '"Florian Lançon" <florian.lancon@blublod.com>',
						to: `${user[0].email}`,
						// bcc: "kemaillard@gmail.com",
						subject: "Votre annonce arrive à expiration",
						// text: "Hello World!!!",
						html: `<b>Bonjour</b> ${user[0].firstname}<a> </a> ${user[0].name} <b>,
						Une de vos annonces arrive à expiration, si pas modifié d'ici 30 jours, elle sera automatiquement supprimée</b>`,
					});

					console.log(
						"Notice Mail Sent, for postId = " + arrayPosts[i]._id
					);
				}
				mailing();
			}
		}
	},

};
