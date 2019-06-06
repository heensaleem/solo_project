import React, { Component } from 'react';
import {connect} from 'react-redux';


class viewRecipe extends Component {
  render() {
    return (
      <div>
          <p>View Page</p>
      </div>
    );
  }
}

export default connect()(viewRecipe);
