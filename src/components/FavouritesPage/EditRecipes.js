import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import TextField from '@material-ui/core/TextField';

import { Typography } from "@material-ui/core";


const styles = theme => ({ 
    textField: {
        marginTop: 2,
        marginBottom: 2
      },
      
      button: {
        margin: 0,
        width: 120,
        float: "right"
      },
      
      typography: {
        useNextVariants: true
      }
});

  

   

class editRecipes extends Component {

    //state to take the new added recipe from the reducer
    state = {
        recipe_title: this.props.recipeItems.recipe_title|| '',
        category: this.props.recipeItems.category || '',
        description: this.props.recipeItems.description || '',
        makes: (this.props.recipeItems.makes) || '',
        serves: (this.props.recipeItems.serves) || '',
        cooktime: (this.props.recipeItems.cooktime) || '',
        image_url: (this.props.recipeItems.image_url) || '',
        ingredients: (this.props.recipeItems.ingredients) || '',
        preparation: (this.props.recipeItems.preparation) || '',
        id:(this.props.recipeItems.id)
    };
//sets the name and value of the item in the recipe
    handleChange = (property) => event  => {
        console.log('in handle change');
        this.setState({
            [property]: event.target.value,
          });
     }
     //submit the recipe and updates in the database
    handleSubmit = () => {
        console.log('clicked on submit button', this.state )
        this.props.dispatch({ type: "UPDATE_RECIPES", payload: this.state });
        this.props.history.push('/favourites');
    }

    render (){
        const { classes } = this.props;
        return (
            <>
              {/* <pre>{JSON.stringify(this.props.recipeItems)}</pre>  */}
             <div>
             <Typography variant="h6" gutterBottom>
             <h2>Edit Recipe</h2>
      </Typography>
             </div>
        <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}  >
              <TextValidator
                id="recipe_title"
                label="* Title"
                fullWidth
                //className={classNames(classes.textField)}
                onChange={this.handleChange("recipe_title")}
                type="text"
                margin="normal"
                value={this.state.recipe_title}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} >
              <TextValidator
                id="category"
                label="* Category"
                fullWidth
                //className={classNames(classes.textField)}
                onChange={this.handleChange("category")}
                name="category"
                type="text"
                margin="normal"
                value={this.state.category}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} >
            <TextValidator
        id="description"
        label="Description"
        multiline
        fullWidth
        rowsMax="3"
        value={this.state.description}
        onChange={this.handleChange('description')}
        //className={classes.textField}
        margin="normal"
        validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
      />
          </Grid>  
            <Grid item xs={6} >
              <TextValidator
                id="image_url"
                label="* Image"
                fullWidth
                //className={classNames(classes.textField)}
                onChange={this.handleChange("image_url")}
                name="imageUrl"
                type="url"
                margin="normal"
                // helperText="*required"
                value={this.state.image_url}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={3} >
              <TextValidator
                id="makes"
                label="Makes"
                fullWidth
                type="text"
                value={this.state.makes}
                onChange={this.handleChange("makes")}
                //className={classes.textField}
                margin="normal"
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} >
              <TextValidator
                id="serves"
                label="serves"
                fullWidth
                type="text"
                value={this.state.serves}
                onChange={this.handleChange("serves")}
                //className={classes.textField}
                margin="normal"
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} >
              <TextValidator
                id="cooktime"
                label="* Cook Time"
                fullWidth
                rowsMax="4"
                type="text"
                value={this.state.cooktime}
                onChange={this.handleChange("cooktime")}
                //className={classes.textField}
                margin="normal"
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} >
            <TextValidator
        id="outlined-multiline-flexible"
        label="Ingredients"
        multiline
        fullWidth
        rowsMax="8"
        value={this.state.ingredients}
        onChange={this.handleChange('ingredients')}
        //className={classes.textField}
        margin="normal"
        validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
      />
        </Grid>
        <Grid item xs={6} >
            <TextValidator
        id="outlined-multiline-flexible"
        label="* Preparation Instructions"
        multiline
        fullWidth
        rowsMax="10"
        value={this.state.preparation}
        onChange={this.handleChange('preparation')}
        //className={classes.textField}
        margin="normal"
        validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
      />
        </Grid>    
            <Grid item xs={8} >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                //className={classes.button}
              >
               SUBMIT
              </Button>
            </Grid>
            </Grid>
        </ValidatorForm>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
    //user: state.user,
    recipeItems: state.editFavReducer
  });

export default withRouter(withStyles(styles)(connect(mapStateToProps)(editRecipes)));