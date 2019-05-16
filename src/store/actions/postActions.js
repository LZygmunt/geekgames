export const createPost = (post) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const gameId = getState().game.id;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("posts").add({
      ...post,
      authorId: authorId,
      gameId: gameId,
      created: new Date()
    }).then(() => {
      dispatch({ type: "CREATE_POST", post })
    }).catch((err) => {
      dispatch({ type: "CREATE_POST_ERROR", err })
    });
  }
};

export const createComment = (comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    firestore.collection("comments").add({
      ...comment,
      authorId: authorId,
      created: new Date()
    }).then(() => {
      dispatch({ type: "CREATE_COMMENT", comment })
    }).catch((err) => {
      dispatch({ type: "CREATE_COMMENT_ERROR", err })
    });
  }
};

export const followEvent = (event) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").add({
      authorId: authorId,
      eventId: event.id,
      created: new Date()
    }).then(() => {
      dispatch({ type: "FOLLOW_EVENT", event })
    }).catch((err) => {
      dispatch({ type: "FOLLOW_EVENT_ERROR", err })
    });
  }
};

export const unfollowEvent = (event) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const eventId = getState().post.id;

    firestore.collection("followers").doc(
      eventId
    ).delete().then(() => {
      dispatch({ type: "UNFOLLOW_EVENT", event })
    }).catch((err) => {
      dispatch({ type: "UNFOLLOW_EVENT_ERROR", err })
    });
  }
};
