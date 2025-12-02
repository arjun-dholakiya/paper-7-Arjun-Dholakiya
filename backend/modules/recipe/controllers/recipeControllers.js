const recipeServices = require("../services/recipeServices");

exports.createRecipe = async (req, res) => {
    try {
      const recipe = await recipeServices.addRecipe(req.body, req);
      res.status(201).json({ 
        message:"Recipe Added Successfully",
        recipe
       });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.getAllRecipes = async (req, res) => {
    try {
      const recipes = await recipeServices.getAllRecipes();
      res.json({ recipes });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.getSingleRecipe = async (req, res) => {
    try {
      const recipe = await recipeServices.getSingleRecipe(req.params.id);
      res.json({ recipe });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.updateRecipe = async (req, res) => {
    try {
      const recipe = await recipeServices.updateRecipe(req.params.id, req.body, req);
      res.json({ recipe });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.deleteRecipe = async (req, res) => {
    try {
      const deleted = await recipeServices.deleteRecipe(req.params.id, req);
      res.json({ message: "Recipe Deleted", deleted });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }; 
  
  exports.filterRecipes = async (req, res) => {
    try {
      const data = await recipeServices.filterRecipes(req.query);
      res.status(200).json({
        message: "Filtered Recipes",
        data
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.listRecipes = async (req, res) => {
    try {
      const data = await recipeServices.listRecipes(req.query);
      res.status(200).json({
        message: "Recipes Listed",
        data
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  