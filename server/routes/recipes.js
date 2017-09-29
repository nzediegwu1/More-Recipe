import express from 'express';
const router = express.Router();
import RecipesController from '../controllers/recipes.js';

const recipes = new RecipesController();

router.get('/', recipes.getAllRecipes);
router.get('/:id', recipes.getRecipe);
router.post('/', recipes.postRecipe);
router.put('/:id', recipes.updateRecipe);
router.delete('/:id', recipes.deleteRecipe);
router.post('/:id/reviews', recipes.postReview);

export default router;
