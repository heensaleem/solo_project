import React, { Component } from 'react';
import { connect } from 'react-redux';

class favouriteRecipes extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_FAV_RECIPES' });
      }
    render(){
        return (
            <div>
                <pre>{JSON.stringify(this.props.recipeItems)}</pre>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    //user: state.user,
    recipeItems: state.favRecipeReducer,
  });

export default connect(mapStateToProps)(favouriteRecipes);