const initState = {};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_GAME":
      console.log("created game", action.game);
      return state;
    case "CREATE_GAME_ERROR":
      console.log("created game error", action.err);
      return state;
    case "UNFOLLOW_GAME":
      console.log("unfollowed game", action.gameTitle);
      return state;
    case "UNFOLLOW_GAME_ERROR":
      console.log("unfollowed game error", action.err);
      return state;
    case "FOLLOW_GAME":
      console.log("followed game", action.gameTitle);
      return state;
    case "FOLLOW_GAME_ERROR":
      console.log("followed game error", action.err);
      return state;
    default:
      return state;
  }
};

export default gameReducer;
