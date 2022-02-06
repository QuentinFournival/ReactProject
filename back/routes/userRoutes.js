const express = require("express");
const {
	setAdmin,
	adminDeleteUser,
	adminUpdateNames,
} = require("../controllers/AdminController");
const router = express.Router();
const {
	createUser,
	login,
	getUserConnected,
	updateInfoUserConnected,
	deleteUser,
	logout,
	verifyEmail,
	mailResetPassword,
	updatePassword,
	mailResetEmail,
	resetEmail,
} = require("../controllers/userController");
const { userJoiValidation } = require("../middleware/joiValidation");
const { verifToken } = require("../middleware/verifToken");

// Routes USER:
router
	.route("/")
	.post( userJoiValidation, createUser)
       	//Inutil ? 👇🏼
	.get(verifToken, getUserConnected)
	.put(verifToken, userJoiValidation, updateInfoUserConnected)
	.delete(verifToken, deleteUser);
// router.route('/:id')
router.route("/login").post(login);
router.route("/logout").post(verifToken, logout);
router.route("/verifymail/:id").get(verifyEmail);
router.route("/forgot").post(verifToken, mailResetPassword);
router.route("/changepass").post(verifToken, userJoiValidation, updatePassword);
router.route("/changemail/:id").post(verifToken, mailResetEmail);
router.route("/confirmemail").post(verifToken, resetEmail);

// Routes ADMIN:
router.route("/admin/setadmin/:id").post(verifToken, setAdmin);
router
	.route("/admin/user/:id")
	.put(verifToken, adminUpdateNames)
	.delete(verifToken, adminDeleteUser);




module.exports = router;
