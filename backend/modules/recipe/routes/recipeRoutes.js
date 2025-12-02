const recipeControllers = require("../controllers/recipeControllers");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../../middleware/authMiddleware");

router.post("/add-recipe",authMiddleware,recipeControllers.createRecipe);
router.get("/get-recipe",authMiddleware,recipeControllers.getAllRecipes);
router.get("/single-recipe/:id",authMiddleware,recipeControllers.getSingleRecipe);
router.put("/update-recipe/:id",authMiddleware,recipeControllers.updateRecipe);
router.delete("/delete-recipe/:id",authMiddleware,recipeControllers.deleteRecipe);
router.get("/filter-recipe",authMiddleware,recipeControllers.filterRecipes);
router.get("/pagination-recipe",authMiddleware,recipeControllers.listRecipes);


module.exports = router;