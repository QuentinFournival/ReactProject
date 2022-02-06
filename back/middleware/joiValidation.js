const Joi = require("joi");

module.exports = {
	userJoiValidation(req, res, next) {
		const schema = Joi.object({
			name: Joi.string().alphanum().min(3).max(20),
			firstname: Joi.string().alphanum().min(3).max(20),
			email: Joi.string().email({ minDomainSegments: 2 }),
			password: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
			newPassInput: Joi.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
			codePostal: Joi.string().pattern(new RegExp("^[0-9]{5}$")),
			city: Joi.string().alphanum().min(2).max(20),
			phone: Joi.string().pattern(new RegExp("^[0-9]{10}$")),


		});

		const { name, firstname, email, password, newPassInput, codePostal, city, phone } = req.body;
		const { error } = schema.validate({
			name,
			firstname,
			email,
			password,
			newPassInput,
			codePostal, 
			city, 
			phone
		});
		if (error) {
			switch (error.details[0].context.key) {
				case "name":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "firstname":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "email":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "password":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "newPassInput":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "codePostal":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "city":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "phone":
					res.status(500).json({ message: error.details[0].message });
					break;
				default:
					res.status(500).json({ message: "An error occurred." });
					break;
			}
		} else {
			return next();
		}
	},


	postJoiValidation(req, res, next) {
		const shema = Joi.object({
			codePostal: Joi.string().pattern(new RegExp("^[0-9]{5}$")),
			titre: Joi.string().min(3).max(70),
			description: Joi.string().min(3).max(500),
			prix: Joi.string().pattern(new RegExp("^[0-9]{0,9}$")),
		});

		const { codePostal, titre, description, prix } = req.body;
		const { error } = shema.validate({
			codePostal,
			titre,
			description,
			prix,
		});
		if (error) {
			switch (error.details[0].context.key) {
				case "codePostal":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "titre":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "description":
					res.status(500).json({ message: error.details[0].message });
					break;
				case "prix":
					res.status(500).json({ message: error.details[0].message });
					break;
				default:
					res.status(500).json({ message: "An error occurred." });
					break;
			}
		} else {
			return next();
		}

	}


};