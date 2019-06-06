import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeItems from './RecipeItems';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";



const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  container: {
    maxWidth: 1000,
    marginLeft: "auto",
    marginRight: "auto"
  },
  
});

class RecipeList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_RECIPES' });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
        <Grid container spacing={8} direction="row" justify="flex-start">
            {this.props.recipeItems.map(items => (
              <RecipeItems key={items.id} items={items} />
            ))}
          </Grid>
      </div>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  //user: state.user,
  recipeItems: state.recipeReducer,
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(RecipeList));
