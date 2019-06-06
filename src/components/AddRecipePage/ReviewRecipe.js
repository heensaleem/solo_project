import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";


import { withStyles } from '@material-ui/core/styles';
import './Review.css';

//styles by material UI
const styles = (theme) => {
  return {
    menu: {
      width: 200
    },
    button: {
      margin: theme.spacing(2),
      float: "center"
    },
    
  }
};


class reviewRecipe extends Component {

  isComplete = () => {
    let recipe_title = this.props.recipeItem.recipe_title;
    let category = this.props.recipeItem.category;
    let description = this.props.recipeItem.description
    let makes = this.props.recipeItem.makes;
    let serves = this.props.recipeItem.serves;
    let cooktime = this.props.recipeItem.cooktime;
    let image_url = this.props.recipeItem.image_url;
    let ingredients = this.props.recipeItem.ingredients;
    let preparation = this.props.recipeItem.preparation;
    if (recipe_title && category && makes && serves && cooktime && image_url && ingredients && description && preparation) {
      return true;
    }
    return false;
  }

  conditionalButton = () => {
    return (
      //if is complete true show submit button otherwise button disabled
      (this.isComplete()) ?
        // Call this.handleSubmit not right away
        <Button onClick={() => this.handleSubmit()} variant="contained" color="primary" className={this.props.classes.button}>submit</Button>
        :
        <Button variant="contained" className={this.props.classes.button} disabled >
          Incomplete
           </Button>
    )
  }
//submit the form after review and dispatch the info to the saga and clear the recipe from the reducer
//also sends email to all the users
  handleSubmit = () => {
    console.log('clicked on submit button');
    this.props.dispatch({ type: "ADD_RECIPES", payload: this.props.recipeItem });
    this.props.dispatch({ type: 'CLEAR_RECIPES' });
    this.props.dispatch({ type: "SEND_EMAIL" })
    this.props.history.push('/home');
  }
//clicked on prevous button on DOM takes user to the add recipe page
  handlePrevious = () => {
    console.log('clicked on submit button');
    this.props.history.push('/addrecipe');
  }
  
  render() {
    return (
      // <Grid
      //   container
      //   spacing={2}
      //   direction="row"
      //   justify="center"
      //   alignItems="flex-start">
        <div>
          <h2>Review Your Recipe</h2>

          <form >
            <p ><b>Recipe Title :</b> {this.props.recipeItem.recipe_title}</p>
            <p><b>Category : </b>{this.props.recipeItem.category}</p>
            <p><b>Description : </b>{this.props.recipeItem.description}</p>
            <p><b>Makes : </b>{this.props.recipeItem.makes}</p>
            <p><b>Serves :</b> {this.props.recipeItem.serves}</p>
            <p><b>cook Time : </b>{this.props.recipeItem.cooktime}</p>
            <p className="image"><b> Image  : </b><img src={this.props.recipeItem.image_url}  width="200" height="200"/></p>
            <p><b>Ingredients : </b>{this.props.recipeItem.ingredients}</p>
            <p><b>Preparation Instructions :</b> {this.props.recipeItem.preparation}</p>
            <Button onClick={() => this.handlePrevious()} variant="contained" color="primary">Previous</Button>
            {/* conditional rendering for the button to show up only when all the form is filled */}
            {this.conditionalButton()}
            {/* <button type="submit" >SUBMIT</button> */}
          </form>
          
        </div>
      //</Grid>

    )
  }
}


const mapStateToProps = state => ({
  //user: state.user,
  recipeItem: state.addRecipeReducer,
  confirmPost: state.conformPostReducer
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(reviewRecipe)));