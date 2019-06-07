import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Typography } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';

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

class AddRecipesForm extends Component {
  state = {
    recipe_title: '',
    category: '',
    makes: '',
    serves: '',
    cooktime: '',
    image_url: '',
    ingredients: '',
    description: ''
  };

  

  // handles on inputs on form and sets state
  handleChange = property => event => {
    this.props.dispatch({ type: "SEND_RECIPES", payload: event.target.value, name: property })
    
  };

  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form
  handleSubmit = () => {
    this.props.dispatch({ type: "STORE_RECIPES", payload: this.props.recipeItems });
    
    this.props.history.push('/review');

  };
  hideButton = (event) => {
    event.preventDefault();
    let hideObject = {
      recipe_title: 'Chicken Biryani, Hyderabadi Style',
    category: 'Breakfast and Brunch',
    makes: '8 ',
    serves: '8',
    cooktime: '1 hr 15 m',
    image_url: 'https://i0.wp.com/www.happyandharried.com/wp-content/uploads/2018/06/CHICKEN-DUM-BIRYANI-HAPPYHARRIED.jpg',
    ingredients: '1/4 cup ghee (clarified butter),20 whole cloves, 9 whole cardamom pods, 5 bay leaves, 1 medium onion-chopped, 5 small green chile peppers, 2 tablespoons ginger garlic paste, 1 (3 pound) whole chicken, cut into pieces,1 1/2 cups plain yogurt,1 teaspoon salt,6 fresh curry leaves (optional),3 cups uncooked jasmine or white rice,4 1/8 cups water,1 sprig cilantro leaves with stems',
    description: 'My husbands mother taught me this recipe, an authentic Hyderabadi-style biryani that is a trademark of home-cooking in south India.  substitute curd (homemade south Indian yogurt) for yogurt.',
    preparation:`Soak rice for 30 minutes in enough water to cover; then drain.
    Meanwhile, heat ghee in a large skillet over medium heat. Stir in cloves, cardamom, and bay leaves. Then stir in onion, and cook until soft, 6 to 7 minutes. Stir in chile peppers and ginger paste. Stir in yogurt, salt, and curry, and then place chicken in pan. Cook for 20 to 25 minutes, stirring occasionally and turning the chicken pieces, until only about 1 cup of liquid remains.
    Mix in rice, water, and cilantro. Bring to a boil. Reduce heat to low, cover, and cook for 20 minutes. Check rice after about 12 minutes; if it is dry, add 1/2 cup water, and continue cooking.`
    }
    this.props.dispatch({type:"STORE_RECIPES", payload: hideObject});
  }

  render() {
    //const { classes } = this.props;
    return (
      <>
        {/* <pre>{JSON.stringify(this.props.reduxState.recipeReducer)}</pre>  */}
        <div>
          <Typography>
            <h2>Add New Recipe</h2>
          </Typography>
          <button type="button" className="hide" onClick={this.hideButton}></button>
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
                  id="name"
                  label="* Title"
                  fullWidth
                  //className={classNames(classes.textField)}
                  onChange={this.handleChange("recipe_title")}
                  name="name"
                  type="text"
                  margin="normal"
                  value={this.props.recipeItems.recipe_title}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3} >
                <TextValidator
                  select
                  id="category"
                  label="* Category"
                  fullWidth
                  //className={classNames(classes.textField)}
                  onChange={this.handleChange("category")}
                  name="category"
                  type="text"
                  margin="normal"
                  value={this.props.recipeItems.category}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  variant="outlined">
                  <MenuItem value="Appetizers and Snacks">Appetizers and Snacks</MenuItem>
                  <MenuItem value="Breakfast and Brunch">Breakfast and Brunch</MenuItem>
                  <MenuItem value="Baby and Toddler Recipes">Baby and Toddler Recipes</MenuItem>
                  <MenuItem value="Dinner Recipes">Dinner Recipes</MenuItem>
                  <MenuItem value="Lunch Recipes">Lunch recipes</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                  <MenuItem value="Drinks">Drinks</MenuItem>
                  <MenuItem value="Cake">Cake</MenuItem>
                  <MenuItem value="cookie And Biscuit">cookie And Biscuit</MenuItem>
                  <MenuItem value="other">other</MenuItem>
                </TextValidator>
              </Grid>
              <Grid item xs={6} >
                <TextValidator
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  fullWidth
                  rowsMax="3"
                  value={this.props.recipeItems.description}
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
                  value={this.props.recipeItems.image_url}
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
                  value={this.props.recipeItems.makes}
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
                  value={this.props.recipeItems.serves}
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
                  value={this.props.recipeItems.cooktime}
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
                  rowsMax="15"
                  value={this.props.recipeItems.ingredients}
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
                  rowsMax="20"
                  value={this.props.recipeItems.preparation}
                  onChange={this.handleChange('preparation')}
                  //className={classes.textField}
                  margin="normal"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                //className={classes.button}
                >
                  NEXT
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
  recipeItems: state.addRecipeReducer,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps)(AddRecipesForm)));
