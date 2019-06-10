import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeList from './RecipeList';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";
import './user.css';


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

});


class userPage extends Component {


  state = {
    category: '',
  }

  // handles on inputs on form and sets state
  handleChange = (event) => {
    this.setState({
      category: event.target.value
    })
    // this.props.dispatch({ type: "SEND_RECIPES", payload: event.target.value, name: property })

  };

  handleSubmit = () => {
    console.log('clicked on submit userPage')
    this.props.dispatch({ type: "SORT_VIEW_RECIPE", payload: this.state.category })
  }
  handleClear = () => {
    this.props.dispatch({ type: "FETCH_RECIPES" })
    this.setState({
        category: ''
     
    })
  }

  render() {
    console.log('state of category', this.state);
    return (

      <>
      <div className="center">
      <Grid container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-start">
      <Grid item xs={12} >
                <TextField
                  select
                  id="category"
                  label="* Category"
                  fullWidth
                  //className={classNames(classes.textField)}
                  onChange={this.handleChange}
                  name="category"
                  type="text"
                  margin="normal"
                   value={this.state.category}

                  variant="outlined">
                   <MenuItem value="Appetizers and Snacks">Appetizers and Snacks</MenuItem>
                  <MenuItem value="Breakfast and Brunch">Breakfast and Brunch</MenuItem>
                  <MenuItem value="Baby and Toddler Recipes">Baby and Toddler Recipes</MenuItem>
                  <MenuItem value="Lunch and Dinner">Lunch and Dinner</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                  <MenuItem value="Drinks">Drinks</MenuItem>
                  <MenuItem value="Cake">Cake</MenuItem>
                  <MenuItem value="cookie And Biscuit">cookie And Biscuit</MenuItem>
                  <MenuItem value="other">other</MenuItem> 
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6} >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  
                  onClick={this.handleSubmit}
                //className={classes.button}
                >
                  FILTER
              </Button>
              </Grid>
              <Grid item xs={12} sm={6} >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  
                  onClick={this.handleClear}
                //className={classes.button}
                >
                  CLEAR
              </Button>
              </Grid>
              </Grid>
             
              </div>
          <RecipeList />
          
      </>
    );
  }
}

const mapStateToProps = state => ({
  //user: state.user,
  recipeItems: state.recipeReducer,
});

export default withStyles(styles)(connect(mapStateToProps)(userPage));

