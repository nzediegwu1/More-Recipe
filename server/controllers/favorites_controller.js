import models from '../models';
import val from './validator';

const validator = new val('favorites');

class Favorites {
    addFavorite(req, res) {
        const verify = validator.verify(req, res);
        if (validator.success) {
            return models.Favorites.create({
                UserId: req.decoded.id,
                RecipeId: req.body.RecipeId,
            })
            .then(addedFavorite => res.status(201).json({ success: { status: addedFavorite } }))
            .catch(error => res.status(500).json({ error: { message: error } }));
        }
        return validator.verificationError;
    }
    getFavorites(req, res) {
        // req.params.UserId is mere formality since not to be used for security reasons
        return models.Favorites.findAll({ where: { UserId: req.decoded.id } })
        .then(favoriteRecipes => res.status(200).json({ success: { status: favoriteRecipes } }))
        .catch(error => res.status(401).json({ error: { message: error } }));
    }
}

export default Favorites;
