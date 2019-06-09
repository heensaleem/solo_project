import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 8,
    overflowX: "auto",
    backgroundColor:"#f1f8e9"
  },
  iconHover: {
    "&:hover": {
      color: theme.palette.primary.main
    }
  },
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



class profilePage extends Component {
  state = {
    open: false,
    selectedId: ""
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER_INFO' });
    this.props.dispatch({ type: 'FETCH_RECIPES' });
  }
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
            Are you sure you want to delete this Recipe?
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
        type: "DELETE_RECIPE",
        payload: this.state.selectedId
      });
    }
    this.setState({
      open: false,
      selectedId: ""
    });
  }
    render() {
      const { classes } = this.props;

      return (
        <>
          {/* <pre>{JSON.stringify(this.props.user)}</pre> */}
          <div>
            {(this.props.user.length) ?
              <div>

                <form className="profileForm" >
                  <Grid item xs={12}  >
                    <TextField
                      id="standard-name"
                      label="User Name"
                      //className={classes.textField}
                      value={this.props.user[0].username}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      id="standard-name"
                      label="First Name"
                      //className={classes.textField}
                      value={this.props.user[0].firstname}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      id="standard-name"
                      label="Last Name"
                      //className={classes.textField}
                      value={this.props.user[0].lastname}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}  >
                    <TextField
                      id="standard-name"
                      label="Email"
                      //className={classes.textField}
                      value={this.props.user[0].email_id}
                      margin="normal"
                    />
                  </Grid>
                </form>
              </div>
              :
              <div>empty</div>
            }
          

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Project Name</CustomTableCell>
                  <CustomTableCell align="right" />

                  {/* <CustomTableCell align="right">Fat (g)</CustomTableCell>
                            <CustomTableCell align="right">Carbs (g)</CustomTableCell>
                            <CustomTableCell align="right">Protein (g)</CustomTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.recipeItems.map(row => (
                  <TableRow key={row.id}>
                    <CustomTableCell component="th" scope="row">
                      {row.recipe_title}
                    </CustomTableCell>
                    <CustomTableCell style={{ width: "10%" }} align="right">
                      <IconButton
                        className={classes.iconHover}
                        onClick={this.handleDeleteClick(row.id)}
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CustomTableCell>

                    {/* <CustomTableCell align="right">{row.fat}</CustomTableCell>
                                <CustomTableCell align="right">{row.carbs}</CustomTableCell>
                                <CustomTableCell align="right">{row.protein}</CustomTableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          {this.deleteDialog()}
          </div>
        </>

      );
    }
  }

  const mapStateToProps = state => ({
    //user: state.user,
    user: state.userinfoReducer,
    recipeItems: state.recipeReducer

  });


  export default withStyles(styles)(connect(mapStateToProps)(profilePage));