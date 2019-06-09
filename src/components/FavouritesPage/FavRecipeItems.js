import React, { Component } from "react";
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import {Edit}from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";


const styles = (theme) => {
  return {
    card: {
      maxWidth: 500,
      backgroundColor:"#f1f8e9"
    },
    button: {
      margin: 0,
      width: 120,
      float: "right"
    },
    media: {
      height: 0,
      paddingTop: "67.25%" // 16:9,
    },
     
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 8,
      overflowX: "auto"
    },
    iconHover: {
      "&:hover": {
        color: theme.palette.primary.main
      }
    },
    avatar: {
      backgroundColor: "#33ab9f"
    }
  }
  };
class favRecipeItems extends Component {
    state = {
        expanded: false,
        heartToggle: true,
        removeItem: false,
        updateFavourites: false,
      };

      // Handle delete button click action to delete the selected project from table
  handleDeleteClick = id => () => {
    console.log("delete click for id", id);
    this.setState({
      open: true,
      selectedId: id
    });
  };
// shows confirmation message before deleting the project from database
deleteDialog = () => {
  return (
    <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Please Confirm"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to Remove this Recipe from Favourites?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={this.handleDeleteConfirm("disagree")}
          color="primary"
        >
          Disagree
        </Button>
        <Button
          onClick={this.handleDeleteConfirm("agree")}
          color="primary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

handleDeleteConfirm = confirmation => () => {
  if (confirmation === "agree") {
    console.log("clicked agree");
    this.props.dispatch({
      type: "REMOVE_FAV_RECIPE",
      payload: {recipe_id: this.state.selectedId }
    });
  }
  this.setState({
    open: false,
    selectedId: ""
  });
};

    // //if remove button is clicked, dispatches an action to remove that specific recipe
    //   removeRecipe = (favRecipeId) => {
    //     if (!this.state.removeItem) {
    //       this.setState({
    //         removeItem: true
    //       });
    //       this.props.dispatch({ type: 'REMOVE_FAV_RECIPE', payload: {recipe_id: favRecipeId} })
    //     } else {
    //       this.setState({
    //         removeItem: false
    //       });
    //     }
        
    //   }; 
// if user clicks on edit button set the state to true and dispatch the info to the reducer
      editFavourites = (items) => {
        console.log('clicked on edit button',items );

        if (!this.state.updateFavourites) {
          this.setState({
            updateFavourites: true
          });
          this.props.dispatch({ type: 'EDIT_FAV_RECIPES', payload: items})
          this.props.history.push('/edit');
        } else {
          this.setState({
            updateFavourites: false
          });
        }
      }
    
     //if the state for the hearttoggle is set to true then change the color of the icon 
      displayHeart = () => {
        if (this.state.heartToggle) {
            return <FavoriteIcon style={{ color: "#d50000" }} />;
          } else {
            return <FavoriteIcon />;
          }
      };
//if the state for the remove item is set to true then change the color 
      removeIcon = () => {
        if (this.state.removeItem) {
            return <DeleteIcon  style={{ color: "#d50000" }} />;
          } else {
            return <DeleteIcon />;
          }
      }

      editIcon = () => {
        if (this.state.updateFavourites) {
          return <Edit style={{ color: "#d50000" }}/>
        } else {
          return <Edit />
        }
      }
    //expands on click and set the state
      handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
      };
    
      render() {
        const { classes } = this.props;
        return (
          <>
          <Grid item xs={12} sm={4} >
            <Card className={this.props.classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={this.props.classes.avatar}>
                    Z
              </Avatar>
                }
                
                title={this.props.items.recipe_title}
    
              />
              <div className="card-image">
                <CardMedia
                  className={this.props.classes.media}
                  image={this.props.items.image_url}
                  title="image dish name"
                />
              </div>
              <CardContent
                style={{ marginTop: "3px", marginBottom: "3px" }}
              >
                <Typography component="p">
                 <b>{this.props.items.category}</b> 
                </Typography>
              </CardContent>
              <CardContent
                style={{ marginTop: "3px", marginBottom: "3px", height: "90px" }}
              >
                <Typography component="p">
                  {this.props.items.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="Add to favorites"
                  onClick={() =>this.heartToggle}
                >
                  {this.displayHeart()}
                </IconButton>
                <IconButton
                      className={classes.iconHover}
                      onClick={this.handleDeleteClick(this.props.items.id)}
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                      </IconButton>
                <IconButton
                  aria-label="Edit favourites"
                  onClick={() =>this.editFavourites(this.props.items)}
                >
                  {this.editIcon()}
                </IconButton>
                <IconButton
                  className={clsx(this.props.classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
    
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
    
                <Typography paragraph>Makes:{this.props.items.makes}</Typography>
                <Typography paragraph>Serves:{this.props.items.serves}</Typography>
                <Typography paragraph>Cook Time:{this.props.items.cooktime}</Typography>
                  <Typography paragraph>Ingredients:</Typography>
                  <Typography paragraph>
                    {this.props.items.ingredients}
                  </Typography>
                  <Typography paragraph>Preparation Instructions:</Typography>
                  <Typography paragraph>
                    {this.props.items.preparation}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            </Grid>
            
              {this.deleteDialog()}
            </>
        );
      }
    }


const mapStateToProps = state => ({
    //user: state.user,
    recipeItems: state.favRecipeReducer,
  });
  
  // this allows us to use <App /> in index.js
  export default withRouter(withStyles(styles)(connect(mapStateToProps)(favRecipeItems)));
  