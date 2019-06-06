import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

//styles by material UI
const styles = (theme) => {
  return {
    menu: {
      width: 200
    },
    button: {
      margin: theme.spacing(2),
      float: "center"
    },
    
  }
};


class viewRecipe extends Component {

  //clicked on Back button on DOM takes user to the Home Page
  handleClick = () => {
    console.log('clicked on submit button');
    this.props.history.push('/home');
  }
   
  render() {
    console.log('view recipe page ', this.props.recipeItem)
    console.log('view recipe test:', (this.props.recipeItem.length && this.props.recipeItem[0].recipe_title))
    if((this.props.recipeItem.length)){
      const item= this.props.recipeItem[0].ingredients 
      console.log(item);

    }
    
    return (
      <div>
        
          <pre>{JSON.stringify(this.props.recipeItem)}</pre>
          <div>
          <h2>View Recipe</h2>

          <form >
            {(this.props.recipeItem.length) ?
            <div>
            
            <p><b>Recipe Title :</b> {this.props.recipeItem[0].recipe_title}</p> 
            <p><b>Category : </b>{this.props.recipeItem[0].category}</p>
            <p><b>Description : </b>{this.props.recipeItem[0].description}</p>
            <p><b>Makes : </b>{this.props.recipeItem[0].makes}</p>
            <p><b>Serves :</b> {this.props.recipeItem[0].serves}</p>
            <p><b>cook Time : </b>{this.props.recipeItem[0].cooktime}</p>
            <p className="image"><b> Image  : </b><br /><img alt="recipeImage" src={this.props.recipeItem[0].image_url}  width="200" height="200"/></p>
            <p><b>Ingredients : </b>{this.props.recipeItem[0].ingredients.split(",").map(item => {
              return ( 
               <>
               <span>{item}</span><br />
               </>
                )
            })}</p>
            <p><b>Preparation Instructions :</b> {this.props.recipeItem[0].preparation}</p>
            <Button onClick={() => this.handleClick()} variant="contained" color="primary">BACK</Button>
            </div>
            :
            <div>empty</div>
            }
          </form>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    //user: state.user,
    recipeItem: state.recipeViewReducer,
   
  });

export default withRouter(withStyles(styles)(connect(mapStateToProps)(viewRecipe)));
