import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './Footer';
import getOneRecipe from '../actions/getOneRecipe';
import updateRecipe from '../actions/updateRecipe';
import uploadImage from '../utils/uploadImage';
/**
 *
 * @class UpdateRecipe
 *
 * @extends {React.Component}
 */
class UpdateRecipe extends React.Component {
  /**
 * @description Creates an instance of UpdateRecipe.
 *
 * @param {any} props
 *
 * @memberof UpdateRecipe
 */
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      ingredients: '',
      directions: '',
      picture: '',
      selectedImage: false,
      toggleEdit: true
    };
    this.onChange = this.onChange.bind(this);
    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof UpdateRecipe
   */
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(recipeId);
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} nextProps
   *
   * @memberof UpdateRecipe
   */
  componentWillReceiveProps(nextProps) {
    const { id, name, description, directions, ingredients, picture } = nextProps.recipeDetails;
    this.setState({ id, name, directions, description, ingredients, picture });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  onUpload(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ picture: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.setState({ selectedImage: true });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  onToggleEdit(event) {
    event.preventDefault();
    this.setState({ toggleEdit: !this.state.toggleEdit });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {any} event
   *
   * @memberof UpdateRecipe
   */
  handleSubmit(event) {
    event.preventDefault();
    const { picture, id } = this.state;
    if (this.state.selectedImage) {
      return uploadImage(picture)
        .then((response) => {
          const url = response.data.secure_url;
          this.setState({ picture: url });
          this.props.updateRecipe(this.state, id);
        })
        .catch((error) => {
          this.setState({ uploadImageError: error.error.message });
        });
    }
    this.props.updateRecipe(this.state, id);
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof UpdateRecipe
   */
  render() {
    const {
      name,
      description,
      ingredients,
      directions,
      picture,
      toggleEdit
    } = this.state;
    return (
      <div>
        <br />
        <div className="container">
          <div className="container">
            {
              this.state.editRecipeSuccess &&
              <div
                className="alert alert-success alert-dismissible"
                role="alert"
              >Recipe Updated</div>
            }
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-4">
                <div className="recipe-image">
                  <img
                    className="img-thumbnail img-responsive"
                    src={picture}
                    alt=""
                    srcSet=""
                  />
                </div>
                <br />
                <label htmlFor="upload" className="file-upload__label">upload image</label>
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={this.onUpload}
                  disabled={toggleEdit}
                />
              </div>
              <div className="col-sm-8">
                <div className="form-group">
                  <label htmlFor="recipeName">Recipe Name</label>
                  <input
                    type="text"
                    id="recipeName"
                    className="form-control"
                    placeholder="Michael's Awesome Sauce"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    disabled={toggleEdit}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipeDescription">Recipe Description</label>
                  <input
                    type="text"
                    id="recipeDescription"
                    className="form-control"
                    placeholder="An awesome sauce by Michael"
                    name="description"
                    value={description}
                    onChange={this.onChange}
                    disabled={toggleEdit}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipeDirections">Recipe Directions</label>
                  <textarea
                    type="text"
                    rows="5"
                    id="recipeDescription"
                    className="form-control"
                    placeholder="Michael's Awesome Sauce"
                    name="directions"
                    value={directions}
                    onChange={this.onChange}
                    disabled={toggleEdit}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipeingredients">Ingredients</label>
                  <textarea
                    type="text"
                    rows="5"
                    id="recipeIngredients"
                    className="form-control"
                    placeholder="Michael's Ingredient list"
                    name="ingredients"
                    value={ingredients}
                    onChange={this.onChange}
                    disabled={toggleEdit}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    disabled={toggleEdit}
                  >Update Recipe</button>
                  <button
                    className="btn btn-success"
                    onClick={this.onToggleEdit}
                  >Edit Recipe</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipeDetails: state.getOneRecipe.singleRecipe,
  errorMessage: state.getOneRecipe.errorMessage,
  updateSuccess: state.getOneRecipe.editRecipeSuccess,
  updateError: state.getOneRecipe.editRecipeError
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(getOneRecipe(id)),
  updateRecipe: (recipe, id) => dispatch(updateRecipe(recipe, id))
});

UpdateRecipe.propTypes = {
  match: PropTypes.shape().isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  recipeDetails: PropTypes.shape(),
  updateRecipe: PropTypes.func.isRequired,
};

UpdateRecipe.defaultProps = {
  recipeDetails: {},
  updateSuccess: '',
  updateError: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe);
