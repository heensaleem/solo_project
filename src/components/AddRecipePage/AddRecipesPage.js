import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
// import AddRecipesForm from './AddRecipesForm';

// defined the material UI theme styles to be used
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 40
  },
  container: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class AddRecipesPage extends Component {
  // Renders the entire app on the DOM
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <div className={classes.container}>
            {/* <AddRecipesForm /> */}
            <p>recipe form goes here</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddRecipesPage);

