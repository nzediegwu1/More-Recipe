const recipes = {
    1: {
        title: 'Okro Soup',
        Ingredient: ['pepper', 'salt', 'red oil', 'okro'],
        description: 'Cook the food same way you cook egusi',
    },
    2: {
        title: 'Egusi Soup',
        Ingredient: ['pepper', 'salt', 'groundnut oil', 'egusi'],
        description: 'Cook the food same way you cook okro',
    },
    3: {
        title: 'jellof Soup',
        Ingredient: ['pepper', 'groundnut oil', 'salt', 'rice', 'fish'],
        description: 'Cook the food same way you cook fried rice',
    },
};

class RecipesController {
    constructor() {
    }
    getAllRecipes(req, res) {
        res.send(recipes);
    }
    getRecipe(req, res) {
        const recipeID = req.params.id;
        res.send(recipes[recipeID]);
    }
}
export default RecipesController;
