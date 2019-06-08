

const userinfoReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_INFO':
          console.log('in set user info rescipe reducer', action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  
  // recipes will be on the redux state at:
  // reduxState.recipeReducer
  export default userinfoReducer;