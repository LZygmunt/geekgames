import postReducer from "./postReducer";
import gameReducer from "./gameReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  post: postReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
