import initialState from '../store/initialState';
import { GET_ALL_RECIPES, GET_ALL_RECIPES_ERROR } from '../actions/actionTypes';

const allRecipes = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.recipes,
        failure: ''
      };
    case GET_ALL_RECIPES_ERROR:
      return {
        ...state,
        failure: action.message
      };
    default:
      return state;
  }
};

export default allRecipes;