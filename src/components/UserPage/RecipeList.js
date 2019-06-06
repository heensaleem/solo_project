import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeItems from './RecipeItems';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  container: {
    maxWidth: 1000,
    marginLeft: "auto",
    marginRight: "auto"
  },
  
});

class RecipeList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_RECIPES' });
  }
  // determines which message will display on snackbar depending if post to database was successful
  alertMessage = () => {
    const { classes } = this.props;
    if (this.props.confirmPost.status) {
      return (
        <span id="message-id" style={{ display: "flex", alignItems: "center" }}>
          <CheckCircleIcon className={this.props.classes.icon} />
          recipe add was successful!
        </span>
      );
    } else {
      return (
        <span id="message-id" style={{ display: "flex", alignItems: "center" }}>
          <ErrorIcon className={this.props.classes.icon} />
          Recipe add was unsuccessful
        </span>
      );
    }
  };
  // handles close from snackbar and sends reset dispatch to redux
  handleClose = () => {
    this.props.dispatch({ type: "RESET_POST" });
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
        <Grid container spacing={8} direction="row" justify="flex-start">
            {this.props.recipeItems.map(items => (
              <RecipeItems key={items.id} items={items} />
            ))}
          </Grid>
      </div>
      <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={this.props.confirmPost.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={this.alertMessage()}
          />
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  //user: state.user,
  recipeItems: state.recipeReducer,
  confirmPost: state.conformPostReducer
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(RecipeList));
