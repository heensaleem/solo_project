const sortRecipeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SORT_RECIPE':
          console.log('in sort rescipe reducer', action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  
  // recipes will be on the redux state at:
  // reduxState.recipeReducer
  export default sortRecipeReducer;