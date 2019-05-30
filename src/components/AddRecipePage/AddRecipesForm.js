import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import TextField from '@material-ui/core/TextField';

import { Typography } from "@material-ui/core";


const styles = theme => ({
    textField: {
        marginTop: 2,
        marginBottom: 2
      },
      
      button: {
        margin: 0,
        width: 120,
        float: "right"
      },
      
      typography: {
        useNextVariants: true
      }
    });
    



class AddRecipesForm extends Component {
    state = {
        recipe_title: '',
        category: '',
        makes: '',
        serves: '',
        cooktime: '',
        image_url: '',
        ingredients: '',
        description: ''
    };
   
   // handles on inputs on form and sets state
  handleChange = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
  };

    // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form
  handleSubmit = () => {
    this.props.dispatch({ type: "ADD_RECIPES", payload: this.state });
    this.setState({
        recipe_title: '',
        category: '',
        makes: '',
        serves: '',
        cooktime: '',
        image_url: '',
        ingredients: '',
        description: ''
    });
  };
    
  // determines which message will display on snackbar depending if post to database was successful
  alertMessage = () => {
    const { classes } = this.props;
    if (this.props.confirmPost.status) {
      return (
        <span id="message-id" style={{ display: "flex", alignItems: "center" }}>
          <CheckCircleIcon className={classes.icon} />
          Recipe Successfully Added!
        </span>
      );
    } else {
      return (
        <span id="message-id" style={{ display: "flex", alignItems: "center" }}>
          <ErrorIcon className={classes.icon} />
          Recipe add was unsuccessful!
        </span>
      );
    }
  };

    render() {
        //const { classes } = this.props;
        return (
            <>
        <Typography>
          <h2>Add New Project</h2>
        </Typography>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          
            <Grid item xs={12} >
              <TextValidator
                id="name"
                label="* Title"
                fullWidth
                //className={classNames(classes.textField)}
                onChange={this.handleChange("recipe_title")}
                name="name"
                type="text"
                margin="normal"
                value={this.state.recipe_title}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} >
              <TextValidator
                id="category"
                label="* Category"
                fullWidth
                //className={classNames(classes.textField)}
                onChange={this.handleChange("category")}
                name="category"
                type="text"
                margin="normal"
                value={this.state.category}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} >
            <TextField
        id="outlined-multiline-flexible"
        label="image_url"
        multiline
        rowsMax="1"
        value={this.state.image_url}
        onChange={this.handleChange('image_url')}
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
        </Grid>
            
            <Grid item xs={12} >
              <TextValidator
                id="makes"
                label="Makes"
                multiline
                fullWidth
                rowsMax="4"
                type="text"
                value={this.state.makes}
                onChange={this.handleChange("makes")}
                //className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} >
              <TextValidator
                id="serves"
                label="serves"
                multiline
                fullWidth
                rowsMax="4"
                type="text"
                value={this.state.serves}
                onChange={this.handleChange("serves")}
                //className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} >
              <TextValidator
                id="cooktime"
                label="* Cook Time"
                multiline
                fullWidth
                rowsMax="4"
                type="text"
                value={this.state.cooktime}
                onChange={this.handleChange("cooktime")}
                //className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} >
            <TextField
        id="outlined-multiline-flexible"
        label="Ingredients"
        multiline
        rowsMax="5"
        value={this.state.ingredients}
        onChange={this.handleChange('ingredients')}
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
        </Grid>
        <Grid item xs={12} >
            <TextField
        id="outlined-multiline-flexible"
        label="Description"
        multiline
        rowsMax="8"
        value={this.state.description}
        onChange={this.handleChange('description')}
        //className={classes.textField}
        margin="normal"
        variant="outlined"
      />
        </Grid>    
            <Grid item xs={8} >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                //className={classes.button}
              >
                Submit
              </Button>
            </Grid>
         
        </ValidatorForm>
        
      </>
    );
  }
}
const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default withStyles(styles)(connect(mapReduxStateToProps)(AddRecipesForm));
