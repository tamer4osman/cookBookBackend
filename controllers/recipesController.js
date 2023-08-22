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

module.exports = {
  getRecipes,
  getCategories,
  addCategory,
  addRecipe
};
