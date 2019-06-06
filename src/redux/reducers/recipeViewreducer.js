const recipeViewReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_VIEW_RECIPES':
        return action.payload;
      default:
        return state;
    }
  };
  
  
  // recipes will be on the redux state at:
  // reduxState.recipeReducer
  export default recipeViewReducer;