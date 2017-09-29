import recipes from '../models/recipes.js';
class RecipesController {
    getAllRecipes(req, res) {
        try {
            const sort = req.query.sort;
            const order = req.query.order;
            // query string must contain sort='upvote'
            // before the sort is considered
            if (sort !== 'upvote') {
                return res.status(200).json({ all_recipes: recipes });
                // if sort=upvote and order=des
            } else if (order === 'des') {
                recipes.sort((a, b) => b.upvotes - a.upvotes);
                return res.status(200).json({ sortedUpvotes_Des: recipes })
                // if sort=upvote and order=asc
            } else if (order === 'asc') {
                recipes.sort((a, b) => a.upvotes - b.upvotes);
                return res.status(200).json({ sortedUpvotes_Asc: recipes });
            }
            return res.status(400).json({ response: 'invalid sort parameter' });
        } catch (e) {
            console.log(e);
        }
    }
    getRecipe(req, res) {
        try {
            return res.status(200).json(recipes[req.params.id]);
        } catch (e) {
            console.log(e);
        }
    }
    postRecipe(req, res) {
        try {
            // write further check for recipe data format later
            // before allowing posting of new recipe later
            recipes.push(req.body);
            return res.status(201).json({ success: 'Successfully posted new item' });
        } catch (e) {
            return res.status(500).json({ failure: 'Unable to post new recipe' });
        }
    }
    updateRecipe(req, res) {
        try {
            // get recipe with same index as parameter and change the value
            for (let i = 0; i < recipes.length; i++) {
                if (i === parseInt(req.params.id)) {
                    recipes[i] = req.body;
                    return res.status(200).json({ result: 'successful' });
                }
            }
            return res.status(404).json({ unsuccessful: 'Error updating recipe' });
        } catch (e) {
            // log error to prevent program crashing
            console.log(e);
        }
    }
    deleteRecipe(req, res) {
        try {
            // get recipe where index is same as id parameter and delete
            for (let recipeItem = 0; recipeItem < recipes.length; recipeItem++) {
                if (recipeItem === parseInt(req.params.id)) {
                    delete recipes[recipeItem];
                    return res.status(204).json({ result: 'Delete successful' });
                }
            }
            return res.status(404).json({ unsuccessful: 'Error deleting recipe' });
        } catch (e) {
            console.log(e);
        }
    }
    postReview(req, res) {
        try {
            // get recipe where index is same as id parameter
            // and append req.body to its review array
            for (let recipeItem = 0; recipeItem < recipes.length; recipeItem++) {
                if (recipeItem === parseInt(req.params.id)) {
                    recipes[recipeItem].reviews.push(req.body);
                    return res.status(201).json({ result: 'Successfully Added Review' });
                }
            }
            return res.status(500).json({ unsuccessful: 'Error Adding review' });
        } catch (e) {
            console.log(e);
        }
    }
}
export default RecipesController;