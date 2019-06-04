import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from '@material-ui/core/styles';


// Material UI Styles defined here
const styles = (theme) => {
    return{
    menu: {
      width: 200
    },
    button: {
      margin: 0,
      width: 120,
      float: "right"
    },
    icon: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: theme.spacing.unit
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
                <Button onClick={() => this.handleSubmit()} variant="contained" color="primary">submit</Button>
                :
                <Button variant="contained" disabled >
                    Incomplete
           </Button>
        )
    }

    handleSubmit = () => {
        console.log('clicked on submit button');
        this.props.dispatch({ type: "ADD_RECIPES", payload: this.props.recipeItem });
        this.props.dispatch({ type: 'CLEAR_RECIPES' });
        this.props.dispatch({ type: "SEND_EMAIL" })
        //this.props.history.push('/home');
    }

    handlePrevious = () => {
        console.log('clicked on submit button');
        this.props.history.push('/addrecipe');
    }
    // determines which message will display on snackbar depending if post to database was successful
  alertMessage = () => {
    const { classes } = this.props;
    if (this.props.confirmPost.status) {
      return (
        <span id="message-id" style={{ display: "flex", alignItems: "center" }}>
          <CheckCircleIcon className={this.props.classes.icon} />
          Project Successfully Added!
        </span>
      );
    } else {
      return (
        <span id="message-id" style={{ display: "flex", alignItems: "center" }}>
          <ErrorIcon className={this.props.classes.icon} />
          Project add was unsuccessful
        </span>
      );
    }
  };
  // handles close from snackbar and sends reset dispatch to redux
  handleClose = () => {
    this.props.dispatch({ type: "RESET_POST" });
  };


    render() {
        return (
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="flex-start">
                <div>
                    <h2>Review Your Recipe</h2>

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
                        <Button onClick={() => this.handlePrevious()} variant="contained" color="primary">Previous</Button>
                        {this.conditionalButton()}
                        {/* <button type="submit" >SUBMIT</button> */}
                    </form>
                    <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.confirmPost.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={this.alertMessage()}
        />
                </div>

            </Grid>


        )
    }
}


const mapStateToProps = state => ({
    //user: state.user,
    recipeItem: state.addRecipeReducer,
    confirmPost: state.conformPostReducer
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(reviewRecipe)));