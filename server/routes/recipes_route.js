import express from 'express';
import RecipesController from '../controllers/recipes_controller';
import ReviewsController from '../controllers/reviews_controller';
import Authenticator from '../middleware';

const recipes = new RecipesController();
const reviews = new ReviewsController();
const router = express.Router();
const Auth = new Authenticator();

router.get('/', recipes.getAllRecipes);
router.get('/:id', recipes.getRecipe);
router.post('/', Auth.Verify, recipes.postRecipe);
router.put('/:id', Auth.Verify, recipes.updateRecipe);
router.delete('/:id', Auth.Verify, recipes.deleteRecipe);
router.post('/:id/reviews', Auth.Verify, reviews.postReview);

export default router;
