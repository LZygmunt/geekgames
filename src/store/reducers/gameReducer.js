const initState = {};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_GAME":
      console.log("created game", action.game);
      return state;
    case "CREATE_GAME_ERROR":
      console.log("created game", action.game);
      return state;
    default:
      return state;
  }
};

export default gameReducer;
