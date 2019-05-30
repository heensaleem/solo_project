import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AddRecipesForm from './AddRecipesForm';

// defined the material UI theme styles to be used
const styles = theme => ({
  
});

class AddRecipesPage extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div>
          
             <AddRecipesForm /> 
            
      </div>
    );
  }
}

export default withStyles(styles)(AddRecipesPage);

