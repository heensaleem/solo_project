import React, { Component } from 'react';
import {connect} from 'react-redux';


class viewRecipe extends Component {
   
  render() {
    return (
      <div>
          <pre>{JSON.stringify(this.props.recipeItem)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    //user: state.user,
    recipeItem: state.recipeViewReducer,
   
  });

export default connect(mapStateToProps)(viewRecipe);
