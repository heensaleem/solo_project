const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return action.payload;
    case 'ADD_RECIPES':
        return action.payload;
    default:
      return state;
  }
};

// recipes will be on the redux state at:
// state.recipes
export default recipeReducer;