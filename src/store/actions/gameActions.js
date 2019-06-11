export const createGame = game => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("games").add({
      ...game,
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      created: new Date()
    }).then(() => {
      dispatch({type: "CREATE_GAME", game})
    }).catch((err) => {
      dispatch({type: "CREATE_GAME_ERROR", err})
    });
  }
};

export const followGame = (gameId, game) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").add({
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      followThingId: gameId,
      message: "games",
      followObject: game,
      followTitleToLowerCase: game.title.toLowerCase(),
      created: new Date()
    }).then(() => {
      dispatch({type: "FOLLOW_GAME", gameId, game})
    }).catch((err) => {
      dispatch({type: "FOLLOW_GAME_ERROR", err})
    });
  }
};

export const unfollowGame = (followId, game) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection("followers").doc(
      followId
    ).delete().then(() => {
      dispatch({type: "UNFOLLOW_GAME", followId, game})
    }).catch((err) => {
      dispatch({type: "UNFOLLOW_GAME_ERROR", err})
    });
  }
};
