export const createGame = game => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
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
      dispatch({ type: "CREATE_GAME", game })
    }).catch((err) => {
      dispatch({ type: "CREATE_GAME_ERROR", err })
    });
  }
};

export const followGame = (gameId, gameTitle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").add({
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      followThingId: gameId,
      message: "Gra",
      followTitle: gameTitle,
      created: new Date()
    }).then(() => {
      dispatch({ type: "FOLLOW_GAME", gameId, gameTitle })
    }).catch((err) => {
      dispatch({ type: "FOLLOW_GAME_ERROR", err })
    });
  }
};

export const unfollowGame = (followId, gameTitle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    // const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").doc(
      followId
    ).delete().then(() => {
      dispatch({ type: "UNFOLLOW_GAME", followId, gameTitle })
    }).catch((err) => {
      dispatch({ type: "UNFOLLOW_GAME_ERROR", err })
    });
  }
};
