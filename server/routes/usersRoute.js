import express from 'express';
import UsersController from '../controllers/usersController';
import FavoritesController from '../controllers/favoritesController';
import Authenticator from '../middleware';

const user = new UsersController();
const favorites = new FavoritesController();
const router = express.Router();
const Auth = new Authenticator();

router.post('/signup', user.signUp);
router.post('/signin', user.signIn);
router.get('/', Auth.Verify, user.getUsers);
router.get('/:UserId', Auth.Verify, user.getProfile); // new
router.put('/:UserId', Auth.Verify, user.updateProfile); // new
router.post('/:UserId/recipes', Auth.Verify, favorites.addFavorite);
// user x's recipes
router.get('/:UserId/recipes', Auth.Verify, favorites.getFavorites);
// user x's recipe y or recipe y of user x
router.delete('/:UserId/recipes/:RecipeId', Auth.Verify, favorites.deleteFavorite); // new

export default router;
