import db from '../models/database';

class Recipe {
  addRecipe(req, res) {
    const owner = req.body.owner;
    const name = req.body.name;
    const ingredient = req.body.ingredients;
    const description = req.body.description;
    if (!owner) {
      return res.status(400)
        .send('Recipe should have an owner');
    }
    if (!name) {
      return res.status(400)
        .send('Recipe should have a name');
    }
    if (!ingredient) {
      return res.status(400)
        .send('Recipe should have ingredients');
    }
    if (!description) {
      return res.status(400)
        .send('Recipe should have directions to cook');
    }
    if (ingredient.trim().length < 1) {
      return res.status(400)
        .send('Ingredients are empty');
    }
    if (description.trim().length < 1) {
      return res.status(400)
        .send('Recipe should have a direction to cook');
    }
    const id = db.recipes.length + 1;
    const newRecipe = {
      id,
      ownerId: owner,
      name,
      ingredients: [ingredient],
      description,
      downVote: 0,
      upVote: 0
    };
    db.recipes.push(newRecipe);
    return res.status(201)
      .json({
        status: 'success',
        message: 'Recipe added',
        recipe: newRecipe
      });
    return this;
  }
  updateRecipe(req, res) {
    const query = req.params.recipeId;
    if (!query) {
      return res.status(400)
        .send('Recipe parameter is needed');
    }
    for (let i = 0; i < db.recipes.length; i++) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
        db.recipes[i].name = req.body.newName || db.recipes[i].name;
        db.recipes[i].ingredients = [req.body.newIngredients] || db.recipes[i].ingredients;
        db.recipes[i].description = req.body.newDescription || db.recipes[i].description;
        return res.status(200)
          .json({
            status: 'success',
            message: 'Recipe modified',
            recipe: db.recipes[i]
          });
      }
    }
    return res.status(404)
      .send(`recipe with id ${  query  } not found`);
    return this;
  }
  deleteRecipe(req, res) {
    for (let i = 0; i < db.recipes.length; i++) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
        db.recipes.splice(i, 1);
        return res.status(200)
          .json({
            status: 'success',
            message: 'Recipe has been deleted'
          });
      }
    }
    return res.status(404)
      .send('Recipe not found');
  }
  getAllRecipes(req, res) {
    if (req.query.sort) {
      const sorted = db.recipes.sort((a, b) => b.upVote - a.upVote);
      return res.status(200)
        .json({
          status: 'success',
          data: sorted
        });
    }
    return res.status(200)
      .json({
        status: 'success',
        recipes: db.recipes
      });
    return this;
  }
}

export default Recipe;