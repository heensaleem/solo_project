import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FavRecipeItems from './FavRecipeItems';


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

class favouriteRecipes extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_FAV_RECIPES' });
      }
      render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <div className={classes.container}>
            <Grid container spacing={8} direction="row" justify="flex-start">
                {this.props.recipeItems.map(items => (
                  <FavRecipeItems key={items.id} items={items} />
                ))}
              </Grid>
          </div>
          </div>
        )
      }
}

const mapStateToProps = state => ({
    //user: state.user,
    recipeItems: state.favRecipeReducer,
  });

export default withStyles(styles)(connect(mapStateToProps)(favouriteRecipes));