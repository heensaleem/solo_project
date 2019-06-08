import React, { Component } from 'react';
import {connect} from 'react-redux';



class profilePage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER_INFO' });
  }
  render() {
    return (
      <>
          <pre>{JSON.stringify(this.props.user)}</pre>
         <p>profile page</p>
      </>
    );
  }
}

const mapStateToProps = state => ({
  //user: state.user,
  user: state.userinfoReducer,
  
});


export default connect(mapStateToProps)(profilePage);