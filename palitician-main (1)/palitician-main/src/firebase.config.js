import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyADL5in2OyZzii9aQbcsfKDxwK_uwt4QEs",
  authDomain: "palitician-b2894.firebaseapp.com",
  projectId: "palitician-b2894",
  storageBucket: "palitician-b2894.appspot.com",
  messagingSenderId: "814304773004",
  appId: "1:814304773004:web:4a942291495a3975e04ca9",
  measurementId: "G-Y3MF1XD8Q6"
});

export const db = firebase.firestore();
export const auth = app.auth();
export default app;
