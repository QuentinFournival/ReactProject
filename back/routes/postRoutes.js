const express = require("express");
const {
	createPost,
	readValidatedPost,
	updatePost,
	deletePost,
	verifyPosts,
	UpdateStatusSoldAndDeletePost,
	getPost,
} = require("../controllers/postController");
const { verifToken } = require("../middleware/verifToken");
const router = express.Router();
const upload = require("../config/multer");
const { adminReadAllPosts } = require("../controllers/AdminController");
const { postJoiValidation } = require("../middleware/joiValidation");


//Routes USER:
router
	.route("/post")
	.post(verifToken, postJoiValidation, upload.single("image"), createPost)
	.get(verifToken, readValidatedPost);
router
	.route("/post/:id")
	.get(verifToken, getPost)
	.put(verifToken, updatePost)
	.delete(verifToken, deletePost);
router.route("/verifypost/:id").get(verifToken, verifyPosts);
router.route("/soldpost/:id").post(verifToken, UpdateStatusSoldAndDeletePost);

// Routes ADMIN:
router.route("/admin/post").get(verifToken, adminReadAllPosts);

module.exports = router;
