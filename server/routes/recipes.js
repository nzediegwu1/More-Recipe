import express from 'express';
const router = express.Router();
import RecipesController from '../controllers/recipes.js';

const recipeList = new RecipesController();
router.get('/', recipeList.getAllRecipes);
router.get('/:id', recipeList.getRecipe);

module.exports = router;
