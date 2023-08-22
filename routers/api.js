const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getRecipes,
  getCategories,
  addCategory,
  addRecipe,
  getRecipesByCategory
} = require("../controllers/recipesController");

// API endpoint to get the list of recipes
router.get("/recipes", getRecipes);
// API endpoint to get the list of categories
router.get("/categories", getCategories);
// API endpoint to add a new category
router.post(
  "/categories",
  [body("category").notEmpty().trim().withMessage("Category name is required")],
  addCategory
);
// API endpoint to add a new recipe
router.post('/recipes', [
    body('category').notEmpty().trim().withMessage('Category is required'),
    body('recipe.recipeName').notEmpty().trim().withMessage('Recipe name is required'),
    body('recipe.description').notEmpty().trim().withMessage('Recipe description is required')
], addRecipe);

// API endpoint to get recipes by category
router.get('/recipes/:category', recipesController.getRecipesByCategory);

module.exports = router;
