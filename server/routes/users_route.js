import express from 'express';
import UsersController from '../controllers/users_controller';
import FavoritesController from '../controllers/favorites_controller';
import Authenticator from '../middleware';

const user = new UsersController();
const favorites = new FavoritesController();
const router = express.Router();
const Auth = new Authenticator();

router.post('/signup', user.signUp);
router.post('/signin', user.signIn);
router.get('/', Auth.Verify, user.getUsers);
router.post('/:UserId/recipes', Auth.Verify, favorites.addFavorite);
router.get('/:UserId/recipes', Auth.Verify, favorites.getFavorites);

export default router;
