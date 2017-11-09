import express from 'express';
import RecipesController from '../controllers/recipesController';
import ReviewsController from '../controllers/reviewsController';
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
// recipe x's reviews
router.post('/:id/reviews', Auth.Verify, reviews.postReview);
router.put('/:id/reviews', Auth.Verify, reviews.editReview); // new
router.delete('/:id/reviews', Auth.Verify, reviews.deleteReview); // new

export default router;
