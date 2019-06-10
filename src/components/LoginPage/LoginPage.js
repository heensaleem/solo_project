import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//styles by material UI
const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    
  }
};

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      {/* <Grid container spacing={3}> */}
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} >
        
      <Grid item xs={12}>
              <TextField
        id="User_name"
        label="User Name"
        //className={classNames(classes.textField)}
        value={this.state.username}
        onChange={this.handleInputChangeFor('username')}
        margin="normal"
        variant="outlined"
      />
     
     </Grid>
     <Grid item xs={12}>
      <TextField
        id="password"
        label="Password"
        type="password"
        //className={classNames(classes.textField)}
        value={this.state.password}
        onChange={this.handleInputChangeFor('password')}
        margin="normal"
        variant="outlined"
      />
        </Grid>   
          
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
            
          </div>
          
        
        <center>
          <Button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </Button>
          
        </center>
        </form>
      </div>
      
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
