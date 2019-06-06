import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import FavouritesPage from '../FavouritesPage/FavouritesPage';
import UserPage from '../UserPage/UserPage';
import AddRecipesPage from '../AddRecipePage/AddRecipesPage';
import ReviewRecipe from '../AddRecipePage/ReviewRecipe';
import viewRecipe from '../UserPage/ViewRecipe';
import editRecipesPage from '../FavouritesPage/EditRecipes';
import profilePage from '../ProfilePage/profile';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import './App.css';


// initalize the material UI theme to be used and define the primary color of the theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#008183",
      main: "#008183",
      dark: "#008183",
      contrastText: "#fff"
    }
  }  
});


class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
             <Route
              exact
              path="/favourites"
              component={FavouritesPage}
            /> 
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/addrecipe"
              component={AddRecipesPage}
            />
            <ProtectedRoute
              exact
              path="/review"
              component={ReviewRecipe}
            />
             <ProtectedRoute
              exact
              path="/viewrecipe/:id"
              component={viewRecipe}
            /> 
            <ProtectedRoute
              exact
              path="/edit"
              component={editRecipesPage}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={profilePage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
        </MuiThemeProvider>
      </Router>
  )}
}

export default connect()(App);
