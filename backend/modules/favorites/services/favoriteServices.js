const Favorite = require("../../../models/favorite");

exports.addFavorite = async (userId, recipeId) => {
  
  const exists = await Favorite.findOne({ userId, recipeId });
  if (exists) {
    throw new Error("Recipe already in favorites");
  }

  const fav = await Favorite.create({ userId, recipeId });
  return fav;
};


exports.removeFavorite = async (userId, recipeId) => {
    const removed = await Favorite.findOneAndDelete({ userId, recipeId });
  
    if (!removed) {
      throw new Error("Favorite not found");
    }
  
    return removed;
  };

  exports.getFavorites = async (userId) => {
    const favorites = await Favorite.find({ userId })
      .populate("recipeId");
  
    return favorites;
  };
  