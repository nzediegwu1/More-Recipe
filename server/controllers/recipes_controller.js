import models from '../models';
import val from './validator';

const validator = new val('recipes');
class RecipesController {
    getAllRecipes(req, res) {
        const sort = req.query.sort;
        const order = req.query.order;
        const action = (data) => {
            if (data.length !== 0) {
                return validator.response(res, 'success', 200, data);
            }
            return validator.response(res, 'error', 404, 'No Recipe found');
        };
        // query string must contain sort='upvote'
        // before the sort is considered
        if (sort !== 'upvote') {
            return models.Recipes.findAll({ include: [models.Reviews] })
                .then(allRecipes => action(allRecipes))
                .catch(error => validator.response(res, 'error', 500, error));
            // if sort=upvote and order=des
        } else if (order === 'des') {
            return models.Recipes.findAll({
                order: [['upvotes', 'DESC']],
                include: [models.Reviews],
            }).then(allRecipes => action(allRecipes))
            .catch(error => validator.response(res, 'error', 500, error));
            // if sort=upvote and order=asc
        } else if (order === 'asc') {
            return models.Recipes.findAll({
                order: [['upvotes', 'ASC']],
                include: [models.Reviews],
            }).then(allRecipes => action(allRecipes))
            .catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.response(res, 'err', 400, 'invalid sort parameter');
    }
    getRecipe(req, res) {
        const check = validator.confirmParams(req, res);
        if (check) {
            return models.Recipes.findById(req.params.id, { include: [models.Reviews] })
            .then(recipe => {
                if (recipe.length !== 0) {
                    return validator.response(res, 'success', 200, recipe);
                }
                return validator.response(res, 'error', 404, 'Could not find Recipe');
            })
            .catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.invalidParameter;
    }
    postRecipe(req, res) {
        const verify = validator.verify(req, res);
        if (validator.success) {
            return models.Recipes.create({
                title: req.body.title,
                ingredients: req.body.ingredients,
                description: req.body.description,
                upvotes: req.body.upvotes,
                downvotes: req.body.downvotes,
                UserId: req.decoded.id,
            })
         .then(created => validator.response(res, 'success', 200, created))
         .catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.verificationError;
    }
    updateRecipe(req, res) {
        // get recipe with same index as parameter and change the value
        const check = validator.confirmParams(req, res);
        const verify = validator.verify(req, res);
        if (!check) {
            return validator.invalidParameter;
        } else if (!validator.success) {
            return validator.verificationError;
        }
        return models.Recipes.update({
            title: req.body.title,
            ingredients: req.body.ingredients,
            description: req.body.description,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes,
        }, { where: { id: req.params.id, UserId: req.decoded.id } })
           .then(updatedRecipe => {
               if (updatedRecipe[0] === 1) {
                   return validator.response(res, 'success', 200, 'Update successful');
               }
               // trying to update a recipe whose id does not exist
               // and or which doesnt belong to the user
               return validator.response(res, 'error', 403, 'Wrong transaction');
           })
           .catch(error => validator.response(res, 'error', 500, error));
    }
    deleteRecipe(req, res) {
        // get recipe where index is same as id parameter and delete
        const check = validator.confirmParams(req, res);
        if (check) {
            return models.Recipes.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
                .then(destroyed => {
                    if (destroyed) {
                        return validator.response(res, 'success', 200, 'Successfully deleted');
                    }
                    return validator.response(res, 'err', 403, 'Wrong transaction');
                })
                .catch(error => validator.response(res, 'error', 500, error));
        }
        return validator.invalidParameter;
    }
}

export default RecipesController;
