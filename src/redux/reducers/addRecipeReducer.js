 let recipe = {
   recipe_title: '',
        category: '',
        makes: '',
        serves: '',
        cooktime: '',
        image_url: '',
        ingredients: '',
        description: ''
}
//send recipes post the recipe in database and store recipes stores the current recipe info for the review page and clear recipes set the state to empty
const addRecipeReducer = (state = recipe, action) => {
    switch (action.type) {
       case 'SEND_RECIPES':
         return {...state, [action.name] : action.payload};
      case 'STORE_RECIPES':
        return action.payload;
      case 'CLEAR_RECIPES':
        return recipe;
      default:
        return state;
    }
};

// recipes will be on the redux state at:
// reduxState.recipeReducer
export default addRecipeReducer;