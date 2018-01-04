import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Search from '../components/Search';
import RecipeItem from '../components/RecipeItem';
import capitalize from '../utils/capitalize';
/**
 * @class SearchPage
 * @extends {React.Component}
 */
class SearchPage extends React.Component {
  /**
 * Creates an instance of SearchPage.
 * @param {any} props
 * @memberof SearchPage
 */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      searchErrors: false
    };
  }
  /**
   * @param {any} nextProps
   * @memberof SearchPage
   * @returns {null} null
   */
  componentWillReceiveProps(nextProps) {
    const { recipes, searchErrors } = nextProps;
    this.setState({ recipes, searchErrors });
  }
  /**
   * @returns {jsx} React component
   * @memberof SearchPage
   */
  render() {
    let recipes = (this.state.recipes) ? (this.state.recipes) : [];
    recipes = recipes.map(recipe => (
      <div key={recipe.id} className="col-sm-4">
        <RecipeItem
          image={recipe.picture}
          recipeId={recipe.id}
          recipeName={capitalize(recipe.name)}
          description={capitalize(recipe.description)}
          upvotes={recipe.upvote}
          downvotes={recipe.downvote}
          views={recipe.views}
          owner={`${recipe.User.firstname} ${recipe.User.lastname}`}
        />
        <br />
      </div>)
    );
    return (
      <div>
        <Navbar />
        <br />
        <div className="container">
          <Search />
          <br />
          <div className="row">
            {recipes}
            { this.state.searchErrors && <div className="col-sm-6">
              <h5>No match(es) found</h5>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipes.allRecipes,
  searchErrors: state.recipes.failure
});
SearchPage.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()),
  searchErrors: PropTypes.bool
};
SearchPage.defaultProps = {
  recipes: [],
  searchErrors: false
};

export default connect(mapStateToProps, {})(SearchPage);
