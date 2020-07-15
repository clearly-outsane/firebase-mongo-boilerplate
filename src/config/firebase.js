import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/**
 * TODO - use env variables ,but not important
 * as env variables will be replaced during build
 * and anyone can see it in the client side code
 */
const firebaseConfig = {
  apiKey: "AIzaSyBGoLb_ns1TLOOuwa2FuhobO5rdJi8aQeA",
  authDomain: "website-cf1d6.firebaseapp.com",
  databaseURL: "https://website-cf1d6.firebaseio.com",
  projectId: "website-cf1d6",
  storageBucket: "website-cf1d6.appspot.com",
  messagingSenderId: "351562932165",
  appId: "1:351562932165:web:8d269c10a2907a0251b5ac",
  measurementId: "G-N7TTPGFWV0",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage(); //Sets language to browser default
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

/**
 * TODO - handle user logging in through another sign in
 * method when their email already exists for another
 * auth provider
 *
 * Example - user logs in through facebook after already signing
 * up through gmail using the same email
 */

/**
 * REFER HERE https://firebase.google.com/docs/auth/web/google-signin
 * https://firebase.google.com/docs/auth/web/account-linking
 */

/**
 * add passwordless login
 * https://firebase.google.com/docs/auth/web/email-link-auth
 */
