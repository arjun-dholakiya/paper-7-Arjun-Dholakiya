const Recipe = require("../../../models/recipe");

exports.addRecipe = async (data, req) => {

  const {
    name,
    description,
    ingredients,
    steps,
    image,
    category
  } = data;

  const recipe = await Recipe.create({
    name,
    description,
    ingredients,
    steps,
    image,
    category,
    createdBy: req.user._id
  });

  return recipe;
};

exports.getAllRecipes = async () => {

    const recipes = await Recipe.find()
      .populate("category", "name")
      .populate("createdBy", "name email");
  
    return recipes;
};

exports.getSingleRecipe = async (id) => {

    const recipe = await Recipe.findById(id)
      .populate("category", "name")
      .populate("createdBy", "name email");
  
    return recipe;
  };

  exports.updateRecipe = async (id, data, req) => {

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },  
      data,
      { new: true }
    );
  
    return recipe;
  };

exports.deleteRecipe = async (id, req) => {

  const deleted = await Recipe.findOneAndDelete({
    _id: id,
    createdBy: req.user._id
  });

  return deleted;
};

exports.filterRecipes = async (query) => {
    const { category, time, diet } = query;
  
    let filter = {};
    if (category) filter.category = category;
    if (time) filter.cookingTime = { $lte: Number(time) };
    if (diet) filter.diet = diet; 
  
    const recipes = await Recipe.find(filter);
  
    return recipes;
  };

  exports.listRecipes = async ({ page = 1, limit = 10 }) => {
    page = Number(page);
    limit = Number(limit);
  
    const skip = (page - 1) * limit;
  
    const recipes = await Recipe.find()
      .skip(skip)
      .limit(limit);
  
    const total = await Recipe.countDocuments();
  
    return {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      recipes
    };
  };
  