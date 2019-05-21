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

export const followGame = game => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").add({
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      followThingId: game,
      created: new Date()
    }).then(() => {
      dispatch({ type: "FOLLOW_GAME", game })
    }).catch((err) => {
      dispatch({ type: "FOLLOW_GAME_ERROR", err })
    });
  }
};

export const unfollowGame = game => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    // const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").doc(
      game
    ).delete().then(() => {
      dispatch({ type: "UNFOLLOW_GAME", game })
    }).catch((err) => {
      dispatch({ type: "UNFOLLOW_GAME_ERROR", err })
    });
  }
};
