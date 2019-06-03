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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import {Edit}from '@material-ui/icons';
import { withRouter } from "react-router-dom";


const styles = (theme) => {
  return {
    card: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: "67.25%" // 16:9,
    },
    // fab: {
    //   margin: theme.spacing(1),
    // },  
  
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
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
    
      removeRecipe = (favRecipeId) => {
        if (!this.state.removeItem) {
          this.setState({
            removeItem: true
          });
          this.props.dispatch({ type: 'REMOVE_FAV_RECIPE', payload: {recipe_id: favRecipeId} })
        } else {
          this.setState({
            removeItem: false
          });
        }
        
      }; 

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
    
      // outputs version of heart icon to DOM based on current state of 'heartToggle'
      displayHeart = () => {
        if (this.state.heartToggle) {
            return <FavoriteIcon style={{ color: "#d50000" }} />;
          } else {
            return <FavoriteIcon />;
          }
      };

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
    
      handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
      };
    
      render() {
        const { classes } = this.props;
        return (
          <Grid item xs={12} sm={6}>
            <Card className={this.props.classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={this.props.classes.avatar}>
                    R
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
                  {this.props.items.category}
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
                  aria-label="Remove from Favourites"
                  onClick={() =>this.removeRecipe(this.props.items.id)}
                >
                  {this.removeIcon()}
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
        );
      }
    }


const mapStateToProps = state => ({
    //user: state.user,
    recipeItems: state.favRecipeReducer,
  });
  
  // this allows us to use <App /> in index.js
  export default withRouter(withStyles(styles)(connect(mapStateToProps)(favRecipeItems)));
  