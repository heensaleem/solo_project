import React, { Component } from 'react';
import {connect} from 'react-redux';
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

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email_id: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.firstname && this.state.lastname && this.state.email_id) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email_id: this.state.email_id
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          
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
        //className={classNames(classes.textField)}
        value={this.state.password}
        onChange={this.handleInputChangeFor('password')}
        margin="normal"
        variant="outlined"
      />
        </Grid>
          
          <Grid item xs={12}>
      <TextField
        id="firstname"
        label="First Name"
        //className={classNames(classes.textField)}
        value={this.state.firstname}
        onChange={this.handleInputChangeFor('firstname')}
        margin="normal"
        variant="outlined"
      />
        </Grid>
          
          <Grid item xs={12}>
      <TextField
        id="lastname"
        label="Last Name"
        //className={classNames(classes.textField)}
        value={this.state.lastname}
        onChange={this.handleInputChangeFor('lastname')}
        margin="normal"
        variant="outlined"
      />
        </Grid>
        <Grid item xs={12}>
          <TextField
        id="emailid"
        label="Email ID"
        //className={classNames(classes.textField)}
        value={this.state.email_id}
        onChange={this.handleInputChangeFor('email_id')}
        margin="normal"
        variant="outlined"
      />
      </Grid>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>

        
        <center>
          <Button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
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

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

