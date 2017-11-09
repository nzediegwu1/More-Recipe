import express from 'express';
import VotesController from '../controllers/votesController';
import Authenticator from '../middleware';

const router = express.Router();
const votes = new VotesController();
const Auth = new Authenticator();

router.post('/:RecipeId/upvote', Auth.Verify, votes.upvote);
router.post('/:RecipeId/downvote', Auth.Verify, votes.downvote);

export default router;
