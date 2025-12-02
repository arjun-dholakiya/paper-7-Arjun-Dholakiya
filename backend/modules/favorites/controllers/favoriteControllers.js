const favoriteServices = require("../services/favoriteServices");

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { recipeId } = req.body;

    const fav = await favoriteServices.addFavorite(userId, recipeId);

    res.status(200).json({
      message: "Recipe added to favorites",
      data: fav
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.removeFavorite = async (req, res) => {
    try {
      const userId = req.user._id;
      const { recipeId } = req.body;
  
      const removed = await favoriteServices.removeFavorite(userId, recipeId);
  
      res.status(200).json({
        message: "Recipe removed from favorites",
        data: removed
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.getFavorites = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const favorites = await favoriteServices.getFavorites(userId);
  
      res.status(200).json({
        message: "User favorites",
        data: favorites
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };