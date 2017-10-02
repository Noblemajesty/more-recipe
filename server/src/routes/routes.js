/* import * as Review from '../controllers/controlReview';
import * as Recipe from '../controllers/controlRecipe';
import * as Upvote from '../controllers/controlUpvote'; */
import * as User from '../controllers/userControl';

const user = new User.default();
/* const recipe = new Recipe.default();
const review = new Review.default();
const upvote = new Upvote.default(); */

const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to my api');
  });
  app.post('/api/v1/users/signup', user.createUser);
  app.post('/api/v1/users/signin', user.userLogin);
  app.post('/api/v1/recipes', recipe.addRecipe);
  app.put('/api/v1/recipes/:recipeId', recipe.updateRecipe);
  app.post('/api/v1/recipes/:recipeId/review', review.addReview);
  app.delete('/api/v1/recipes/:recipeId', recipe.deleteRecipe);
  app.get('/api/v1/recipes?sort=up&order=des', upvote.getUpvotes);
  app.get('/api/v1/recipes', recipe.getAllRecipes); 
};

export default router;
