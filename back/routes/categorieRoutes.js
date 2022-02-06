const express = require("express");
const {
	createCategorie,
	updateCategorie,
	deleteCategorie,
	getAllCategories,
} = require("../controllers/categorieController");

const router = express.Router();

router.route("/categorie").post(createCategorie).get(getAllCategories);
router.route("/categorie/:id").put(updateCategorie).delete(deleteCategorie);

module.exports = router;
