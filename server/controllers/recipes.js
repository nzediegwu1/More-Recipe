import recipes from '../models/recipes.js';
class RecipesController {
    getAllRecipes(req, res) {
        try {
            const sort = req.query.sort;
            const order = req.query.order;
            // query string must contain sort='upvote'
            // before the sort is considered
            if (sort !== 'upvote') {
                return res.json({ all_recipes: recipes });
                // if sort=upvote and order=des
            } else if (order === 'des') {
                recipes.sort((a, b) => b.upvotes - a.upvotes);
                return res.json({ sortedUpvotes_Des: recipes });
                // if sort=upvote and order=asc
            } else if (order === 'asc') {
                recipes.sort((a, b) => a.upvotes - b.upvotes);
                return res.json({ sortedUpvotes_Asc: recipes });
            }
            return res.json({ response: 'invalid sort parameter' });
        } catch (e) {
            console.log(e);
        }
    }
    getRecipe(req, res) {
        try {
            return res.json(recipes[req.params.id]);
        } catch (e) {
            console.log(e);
        }
    }
    postRecipe(req, res) {
        try {
            // write further check for recipe data format later
            // before allowing posting of new recipe later
            recipes.push(req.body);
            return res.json({ success: 'Successfully posted new item' });
        } catch (e) {
            return res.json({ failure: 'Unable to post new recipe' });
        }
    }
    updateRecipe(req, res) {
        try {
            // get recipe with same index as parameter and change the value
            for (let i = 0; i < recipes.length; i++) {
                if (i === parseInt(req.params.id)) {
                    recipes[i] = req.body;
                    return res.json({ result: 'successful' });
                }
            }
            return res.json({ unsuccessful: 'Error updating recipe' });
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
                    return res.json({ result: 'Delete successful' });
                }
            }
            return res.json({ unsuccessful: 'Error deleting recipe' });
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
                    return res.json({ result: 'Successfully Added Review' });
                }
            }
            return res.json({ unsuccessful: 'Error Adding review' });
        } catch (e) {
            console.log(e);
        }
    }

}
export default RecipesController;
