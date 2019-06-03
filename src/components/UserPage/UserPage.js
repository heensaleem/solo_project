import React, { Component } from 'react';
import {connect} from 'react-redux';
import RecipeList from './RecipeList';


class UserPage extends Component {
  render() {
    return (
      <>
          <RecipeList />
      </>
    );
  }
}

export default connect()(UserPage);
