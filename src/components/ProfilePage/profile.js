import React, { Component } from 'react';
import {connect} from 'react-redux';



class profilePage extends Component {
  render() {
    return (
      <>
          <p>Profile Page</p>
      </>
    );
  }
}

export default connect()(profilePage);