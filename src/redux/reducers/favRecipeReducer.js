const favRecipeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FAV_RECIPES':
        return action.payload;
      case 'EDIT_FAV_RECIPES':
        return action.payload;
      default:
        return state;
    }
  };
  
  
  // recipes will be on the redux state at:
  // reduxState.favRecipeReducer
  export default favRecipeReducer;