import models from '../models';
import val from '../middleware/validator';

const validator = new val('favorites');

class Favorites {
    addFavorite(req, res) {
        const verify = validator.verify(req, res);
        if (validator.success) {
            models.Recipes.findById(req.body.RecipeId)
            .then(found => {
                if (!found) {
                    const message = 'Cannot favorite recipe that does not exist';
                    return validator.response(res, 'err', 404, message);
                }
                return models.Favorites.create({
                    UserId: req.decoded.id,
                    RecipeId: req.body.RecipeId,
                })
                .then(addedFavorite => validator.response(res, 'success', 201, addedFavorite))
                .catch(error => validator.response(res, 'error', 500, error));
            });
        }
        return validator.verificationError;
    }
    getFavorites(req, res) {
        // req.params.UserId is mere formality since not to be used for security reasons
        return models.Favorites.findAll({ where: { UserId: req.decoded.id } })
        .then(favoriteRecipes => {
            if (favoriteRecipes.length !== 0) {
                return validator.response(res, 'success', 200, favoriteRecipes);
            }
            return validator.response(res, 'err', 404, 'No favorite recipes found');
        })
        .catch(error => validator.response(res, 'error', 500, error));
    }
}

export default Favorites;
