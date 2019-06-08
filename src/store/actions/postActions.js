export const createPost = post => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("posts").add({
      ...post,
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
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

export const followEvent = (eventId, event) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection("followers").add({
      authorId: authorId,
      authorNick: profile.nick,
      authorAvatar: profile.avatar,
      followThingId: eventId,
      message: "events",
      followObject: event,
      followTitleToLowerCase: event.title.toLowerCase(),
      created: new Date()
    }).then(() => {
      dispatch({ type: "FOLLOW_EVENT", eventId, event })
    }).catch((err) => {
      dispatch({ type: "FOLLOW_EVENT_ERROR", err })
    });
  }
};

export const unfollowEvent = (followId, event) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection("followers").doc(
      followId
    ).delete().then(() => {
      dispatch({ type: "UNFOLLOW_EVENT", followId, event })
    }).catch((err) => {
      dispatch({ type: "UNFOLLOW_EVENT_ERROR", err })
    });
  }
};
