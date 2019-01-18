import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import firebase from "firebase";

// var config = {
//   apiKey: "AIzaSyAEZ5qXl-mti2tSpbCI4JtAZg-Y0HEAzNM",
//   authDomain: "childhood-obesity-prevention.firebaseapp.com",
//   databaseURL: "https://childhood-obesity-prevention.firebaseio.com",
//   projectId: "childhood-obesity-prevention",
//   storageBucket: "childhood-obesity-prevention.appspot.com",
//   messagingSenderId: "715715679634"
// };
// firebase.initializeApp(config);
// firebase
//   .firestore()
//   .enablePersistence()
//   .catch(function(err) {
//     if (err.code == "failed-precondition") {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//     } else if (err.code == "unimplemented") {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//     }
//   });
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
