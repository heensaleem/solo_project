import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import { Typography } from "@material-ui/core";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
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
    

    render() {
        
        return (
            <>
        <Typography>
          <h2>Add New Project</h2>
        </Typography>
        
              </>
         );

    }
}
const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default (connect(mapReduxStateToProps)(AddRecipesForm));
