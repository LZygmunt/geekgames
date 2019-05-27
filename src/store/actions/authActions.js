export const signIn = (credentials, firebase) => (dispatch, getState) => {
  firebase.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password
  ).then(() => {
    dispatch({ type: "LOGIN_SUCCESS" })
  }).catch((err) => {
    dispatch({ type: "LOGIN_ERROR", err })
  });
};

export const signOut = firebase => (dispatch, getState, { getFirebase }) => {
  firebase.auth().signOut().then(() => {
    dispatch({ type: "SIGNOUT_SUCCESS" })
  });
};

export const signUp = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firebase.auth().createUserWithEmailAndPassword(
    newUser.email,
    newUser.password
  ).then((resp) => {
    return firestore.collection("users").doc(resp.user.uid).set({
      nick: newUser.nick,
      colorTheme: newUser.colorTheme,
      city: newUser.city,
      avatar: newUser.avatar
    })
  }).then(() => {
    dispatch({ type: "SIGNUP_SUCCESS" })
  }).catch((err) => {
    dispatch({ type: "SIGNUP_ERROR", err })
  });
};

export const updateUserProfile = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    firestore.collection("users").doc(authorId).update({
      ...user
    }).then(() => {
      dispatch({ type: "UPDATE_USER", user })
    }).catch(err => {
      dispatch({ type: "UPDATE_USER_ERROR", err })
    });
  }
};
