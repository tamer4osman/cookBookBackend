const recipesData = require("../data/recipesData.json");

// Controller function for getting the list of recipes
getRecipes = (req, res) => {
  let recipes = JSON.parse(JSON.stringify(recipesData)); // Make a copy to avoid modifying the original data

  res.json(recipes);
};

// Controller function for getting the list of categories
getCategories = (req, res) => {
    const categories = Object.keys(recipesData);
    res.json(categories);
};

// Controller function for adding a new category
addCategory = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newCategory = req.body.category.trim();
    const categories = Object.keys(recipesData);

    if (categories.includes(newCategory)) {
        return res.status(409).json({ error: 'Category already exists' });
    }

    recipesData[newCategory] = [];
    res.status(201).json({ message: 'Category added successfully' });
};

// Controller function for adding a new recipe
addRecipe = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { category, recipe } = req.body;
    const categories = Object.keys(recipesData);

    if (!categories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    const existingRecipes = recipesData[category].map(existingRecipe => existingRecipe.recipeName.toLowerCase());
    if (existingRecipes.includes(recipe.recipeName.toLowerCase())) {
        return res.status(409).json({ error: 'Recipe already exists in the category' });
    }

    recipesData[category].push(recipe);
    res.status(201).json({ message: 'Recipe added successfully' });
};

// Controller function for getting recipes by category
getRecipesByCategory = (req, res) => {
    const category = req.params.category;
    const categories = Object.keys(recipesData);

    if (!categories.includes(category)) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const recipesInCategory = recipesData[category];
    res.json(recipesInCategory);
};

// Controller function for getting a single recipe by name
getRecipeByName = (req, res) => {
    const name = req.params.name;
    let foundRecipe = null;

    // Search for the recipe in all categories
    for (const category in recipesData) {
        const categoryRecipes = recipesData[category];
        const recipe = categoryRecipes.find(recipe => recipe.recipeName.toLowerCase() === name.toLowerCase());

        if (recipe) {
            foundRecipe = recipe;
            break;
        }
    }

    if (!foundRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(foundRecipe);
};

module.exports = {
  getRecipes,
  getCategories,
  addCategory,
  addRecipe,
  getRecipesByCategory,
  getRecipeByName
};