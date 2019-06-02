const editFavReducer = (state = [], action) => {
    switch (action.type) {
      case 'EDIT_FAV_RECIPES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default editFavReducer;