const express = require("express");
const router = express.Router();
const catgoryController = require("../controllers/categoryControllers");

router.post("/add-category",catgoryController.addCategory);

module.exports = router;



