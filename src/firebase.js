import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBsNmpvc_z4dGDmcotUChPflvxUNF9JVec",
  authDomain: "reels-react-app.firebaseapp.com",
  projectId: "reels-react-app",
  storageBucket: "reels-react-app.appspot.com",
  messagingSenderId: "885874415613",
  appId: "1:885874415613:web:6aaed46b27ffa0dfaa2b94",
  measurementId: "G-N0RL0TW3ES",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
  users: firestore.collection("users"),
  posts: firestore.collection("posts"),
  comments: firestore.collection("comments"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();
