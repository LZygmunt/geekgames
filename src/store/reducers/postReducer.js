const initState = {};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("created post: ", action.post);
      return state;
    case "CREATE_POST_ERROR":
      console.log("created post error: ", action.err.message);
      return state;
    case "CREATE_EVENT":
      console.log("created post: ", action.evt);
      return state;
    case "CREATE_EVENT_ERROR":
      console.log("created post error: ", action.err.message);
      return state;
    case "CREATE_COMMENT":
      console.log("created comment: ", action.comment);
      return state;
    case "CREATE_COMMENT_ERROR":
      console.log("created comment error: ", action.err.message);
      return state;
    case "FOLLOW_EVENT":
      console.log("followed event: ", action.eventTitle);
      return state;
    case "FOLLOW_EVENT_ERROR":
      console.log("followed event error: ", action.err.message);
      return state;
    case "UNFOLLOW_EVENT":
      console.log("unfollowed event: ", action.eventTitle);
      return state;
    case "UNFOLLOW_EVENT_ERROR":
      console.log("unfollowed event error: ", action.err.message);
      return state;
    default:
      return state;
  }
};

export default postReducer;
