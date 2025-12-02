const router = require("express").Router();
const favoriteController = require("../controllers/favoriteControllers");
const auth = require("../../../middleware/authMiddleware");

router.post("/add-favorite", auth, favoriteController.addFavorite);
router.post("/remove-favorite", auth, favoriteController.removeFavorite);
router.get("/get-favorite", auth, favoriteController.getFavorites);


module.exports = router;
