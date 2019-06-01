import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

class reviewRecipe extends Component {
//to check if all the feedback is filled
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
    if(recipe_title && category && makes && serves && cooktime && image_url && ingredients && description && preparation){
        return true;
    }
    return false;
}

conditionalButton = () => {
    return (
        //if is complete true show submit button otherwise button disabled
        (this.isComplete()) ?
        // Call this.handleSubmit not right away
            <Button onClick={() => this.handleSubmit()}  variant="outlined" color="primary">submit</Button>
            
            :            
            <Button variant="outlined" disabled >
              Incomplete
           </Button>            
    )
}

handleSubmit = () => {
    console.log('clicked on submit button');
    this.props.dispatch({ type: "ADD_RECIPES", payload: this.props.recipeItem });
    this.props.dispatch({type:'CLEAR_RECIPES'});
    this.props.history.push('/home');
}

handlePrevious = () => {
    console.log('clicked on submit button');
   this.props.history.push('/addrecipe');
}

    render() {
        return (
            <div>

                  <h2>Review Your Recipe</h2>
                {/* form that displays all the feedback with the current redux state */}
                      <form>
                    <p>Recipe Title:{this.props.recipeItem.recipe_title}</p>
                    <p>Category:{this.props.recipeItem.category}</p>
                    <p>Description:{this.props.recipeItem.description}</p>
                    <p>Makes:{this.props.recipeItem.makes}</p>
                    <p>Serves:{this.props.recipeItem.serves}</p>
                    <p>cook Time:{this.props.recipeItem.cooktime}</p>
                    <p>Image URL:{this.props.recipeItem.image_url}</p>
                    <p>Ingredients:{this.props.recipeItem.ingredients}</p>
                    <p>Preparation Instructions:{this.props.recipeItem.preparation}</p>
                    <Button onClick={() => this.handlePrevious()}  variant="outlined" color="primary">Previous</Button>
                    {this.conditionalButton()}
                    {/* <button type="submit" >SUBMIT</button> */}
                    </form>
                    
                

            </div>

        )
    }
}


const mapStateToProps = state => ({
    //user: state.user,
    recipeItem: state.addRecipeReducer,
  });

export default withRouter(connect(mapStateToProps)(reviewRecipe));