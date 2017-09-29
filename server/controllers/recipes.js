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
            recipes.sort((a, b)=> b.upvotes - a.upvotes);
            return res.json({ sortedUpvotes_Des: recipes });
                // if sort=upvote and order=asc
            } else if (order === 'asc') {
            recipes.sort((a, b)=> a.upvotes - b.upvotes);
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
}
export default RecipesController;
