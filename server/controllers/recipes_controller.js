import models from '../models';
import val from './validator';

const validator = new val('recipes');

class RecipesController {
    getAllRecipes(req, res) {
        const sort = req.query.sort;
        const order = req.query.order;
        // query string must contain sort='upvote'
        // before the sort is considered
        if (sort !== 'upvote') {
            return models.Recipes.findAll({ include: [models.Reviews] })
                .then((allRecipes) => {
                    if (allRecipes) {
                        res.status(200).json({ success: { status: allRecipes } });
                    }
                    res.status(404).json({ error: { message: 'No Recipe found' } });
                })
                .catch(error => res.status(500).json({ error: { message: error } }));
            // if sort=upvote and order=des
        } else if (order === 'des') {
            return models.Recipes.findAll({
                order: [['upvotes', 'DESC']],
                include: [models.Reviews],
            })
                .then((allRecipes) => {
                    if (allRecipes) {
                        res.status(200).json({ success: { status: allRecipes } });
                    }
                    res.status(404).json({ error: { message: 'No Recipe found' } });
                })
                .catch(error => res.status(500).json({ error: { message: error } }));
            // if sort=upvote and order=asc
        } else if (order === 'asc') {
            return models.Recipes.findAll({
                order: [['upvotes', 'ASC']],
                include: [models.Reviews],
            })
                .then((allRecipes) => {
                    if (allRecipes) {
                        res.status(200).json({ success: { status: allRecipes } });
                    }
                    res.status(404).json({ error: { message: 'No Recipe found' } });
                })
                .catch(error => res.status(500).json({ error: { message: error } }));
        }
        return res.status(400).json({ error: { message: 'invalid sort parameter' } });
    }
    getRecipe(req, res) {
        const check = validator.confirmParams(req, res);
        if (check) {
            return models.Recipes.findById(req.params.id, { include: [models.Reviews] })
            .then(recipe => {
                if (recipe) {
                    res.status(200).json({ success: { status: recipe } });
                }
                res.status(404).json({ error: { message: 'Could not find Recipe' } });
            })
            .catch(error => res.status(500).json({ error: { message: error } }));
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
         .then(created => res.status(200).json({ success: { status: created } }))
         .catch(error => res.status(500).json({ error: { message: error } }));
        }
        return validator.verificationError;
    }
    updateRecipe(req, res) {
        // get recipe with same index as parameter and change the value
        const check = validator.confirmParams(req, res);
        const verify = validator.verify(req, res);
        if (check) {
            if (validator.success) {
                return models.Recipes.update({
                    title: req.body.title,
                    ingredients: req.body.ingredients,
                    description: req.body.description,
                    upvotes: req.body.upvotes,
                    downvotes: req.body.downvotes,
                    UserId: req.decoded.id,
                }, { where: { id: req.params.id, UserId: req.decoded.id } })
                        .then(updatedRecipe => {
                            if (updatedRecipe[0] === 1) {
                                res.status(200).json({ success: { status: 'Update successful' } });
                            }
                            res.status(404).json({ error: { message: 'Recipe does not exist' } });
                        })
                        .catch(error => res.status(500).json({ error: { message: error } }));
            }
            return validator.verificationError;
        }
        return validator.invalidParameter;
    }
    deleteRecipe(req, res) {
        // get recipe where index is same as id parameter and delete
        const check = validator.confirmParams(req, res);
        if (check) {
            return models.Recipes.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
                .then(destroyed => {
                    if (destroyed) {
                        res.status(204).json({ success: { status: 'Successfully deleted' } });
                    }
                    res.status(404).json({ error: { message: 'No recipe deleted' } });
                })
                .catch(error => res.status(500).json({ error: { message: error } }));
        }
        return validator.invalidParameter;
    }
}

export default RecipesController;
