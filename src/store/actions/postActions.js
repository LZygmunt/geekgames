export const createPost = (post, gameId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("posts").add({
      ...post,
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      gameId: gameId,
      created: new Date()
    }).then(() => {
      dispatch({ type: "CREATE_POST", post })
    }).catch((err) => {
      dispatch({ type: "CREATE_POST_ERROR", err })
    });
  }
};
export const createEvent = evt => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("events").add({
      ...evt,
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      created: new Date()
    }).then(() => {
      dispatch({ type: "CREATE_EVENT", evt })
    }).catch((err) => {
      dispatch({ type: "CREATE_EVENT_ERROR", err })
    });
  }
};

export const createComment = comment => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("comments").add({
      ...comment,
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      created: new Date()
    }).then(() => {
      dispatch({ type: "CREATE_COMMENT", comment })
    }).catch((err) => {
      dispatch({ type: "CREATE_COMMENT_ERROR", err })
    });
  }
};

export const followEvent = evt => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").add({
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      followThingId: evt,
      created: new Date()
    }).then(() => {
      dispatch({ type: "FOLLOW_EVENT", evt })
    }).catch((err) => {
      dispatch({ type: "FOLLOW_EVENT_ERROR", err })
    });
  }
};

export const unfollowEvent = evt => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
console.log(evt)
    firestore.collection("followers").doc(
      evt
    ).delete().then(() => {
      dispatch({ type: "UNFOLLOW_EVENT", evt })
    }).catch((err) => {
      dispatch({ type: "UNFOLLOW_EVENT_ERROR", err })
    });
  }
};
