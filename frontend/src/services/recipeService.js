// src/services/recipeService.js
import api from "../api/axios";

// Create new recipe
export const createRecipe = async (formData) => {
  return await api.post("/recipes/add-recipe", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// Get all recipes
export const getAllRecipes = async () => {
  return await api.get("/recipes/get-recipe");
};

// Get single recipe
export const getRecipeById = async (id) => {
  return await api.get(`/recipes/single-recipe/${id}`);
};

// Update recipe
export const updateRecipe = async (id, formData) => {
  return await api.put(`/recipes/update-recipe/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// Delete recipe
export const deleteRecipe = async (id) => {
  return await api.delete(`/recipes/delete-recipe/${id}`);
};

// Filter recipes
export const filterRecipes = async (filters) => {
  return await api.get("/recipes/filter-recipe", { params: filters });
};

// Get recipes with pagination
export const getRecipesWithPagination = async (page = 1, limit = 10) => {
  return await api.get("/recipes/pagination-recipe", {
    params: { page, limit }
  });
};