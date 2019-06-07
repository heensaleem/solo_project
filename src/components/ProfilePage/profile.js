import React, { Component } from 'react';
import {connect} from 'react-redux';



class profilePage extends Component {
  render() {
    return (
      <>
          <h2>MY ACCOUNT</h2>
         
      </>
    );
  }
}

export default connect()(profilePage);