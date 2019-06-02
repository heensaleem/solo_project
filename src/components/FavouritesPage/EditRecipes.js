import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";


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


class editRecipes extends Component {
    const { classes } = props;
    render (){
        return (
            <pre>{JSON.stringify(this.props.recipeItems)}</pre>
            <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
      />

        )
    }
}

const mapStateToProps = state => ({
    //user: state.user,
    recipeItems: state.favRecipeReducer,
  });

export default withStyles(styles)(connect(mapStateToProps)(editRecipes));