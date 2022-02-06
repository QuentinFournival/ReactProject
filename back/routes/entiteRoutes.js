const express = require("express");
const router = express.Router();
const { verifToken } = require("../middleware/verifToken");


const {
    createEntite,
    getAllEntites,
    updateEntite,
    deleteEntite,
} = require("../controllers/entiteController");


router.route("/entite").post(verifToken, createEntite).get(getAllEntites);
router.route("/entite/:id").put(updateEntite).delete(deleteEntite);

module.exports = router;