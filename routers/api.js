const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const {
  getRecipes,
  getCategories,
  addCategory,
  addRecipe,
  getRecipesByCategory,
  getRecipeByName,
  editCategory,
  editRecipe,
  deleteCategory,
  deleteRecipe,
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
router.post(
  "/recipes",
  [
    body("category").notEmpty().trim().withMessage("Category is required"),
    body("recipe.recipeName")
      .notEmpty()
      .trim()
      .withMessage("Recipe name is required"),
    body("recipe.description")
      .notEmpty()
      .trim()
      .withMessage("Recipe description is required"),
  ],
  addRecipe
);

// API endpoint to get recipes by category
router.get("/categories/:category", getRecipesByCategory);

// API endpoint to get a single recipe by name
router.get("/recipes/:name", getRecipeByName);

// API endpoint to edit an existing category
router.put(
  "/categories/:category",
  [
    param("category")
      .notEmpty()
      .trim()
      .withMessage("Category name is required"),
    body("category")
      .notEmpty()
      .trim()
      .withMessage("New category name is required"),
  ],
  editCategory
);

// API endpoint to edit an existing recipe
router.put(
  "/recipes/:name",
  [
    param("name").notEmpty().trim().withMessage("Recipe name is required"),
    body("category").notEmpty().trim().withMessage("Category is required"),
    body("updatedRecipe.recipeName")
      .notEmpty()
      .trim()
      .withMessage("Updated recipe name is required"),
    body("updatedRecipe.description")
      .notEmpty()
      .trim()
      .withMessage("Updated recipe description is required"),
  ],
  editRecipe
);

// API endpoint to delete a category
router.delete(
  "/categories/:category",
  [
    param("category")
      .notEmpty()
      .trim()
      .withMessage("Category name is required"),
  ],
  deleteCategory
);

// API endpoint to delete a recipe
router.delete(
  "/recipes/:name",
  [param("name").notEmpty().trim().withMessage("Recipe name is required")],
  deleteRecipe
);

router.get("/recipesEjs", (req, res) => {
  // Assuming your recipesData is accessible here
  const allRecipes = Object.values(recipesData).flat(); // Flatten the recipes from all categories
  res.render("recipes", { recipes: allRecipes });
});

// Route to render the list of category names using the EJS view
router.get('/categoriesEjs', (req, res) => {
    const allCategories = Object.keys(recipesData); // Get all category names
    res.render('categories', { categories: allCategories });
});

// Route to render the list of recipe names by category using the EJS view
router.get('/recipesCategoryEjs', (req, res) => {
    const recipesByCategory = {};

    for (const category in recipesData) {
        recipesByCategory[category] = recipesData[category].map(recipe => {
            return { recipeName: recipe.recipeName };
        });
    }

    res.render('recipesByCategory', { recipesByCategory });
});

module.exports = router;
