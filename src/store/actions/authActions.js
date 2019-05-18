export const signIn = (credentials, firebase) => (dispatch, getState) => {
    // const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: "LOGIN_SUCCESS" })
    }).catch((err) => {
      dispatch({ type: "LOGIN_ERROR", err })
    });
  };


export const signOut = (firebase) => (dispatch, getState, { getFirebase }) => {
    // const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: "SIGNOUT_SUCCESS" })
    });
  };

export const signUp = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      return firestore.collection('users').doc(resp.user.uid).set({
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
