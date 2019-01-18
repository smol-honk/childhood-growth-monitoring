const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./childhood-obesity-prevention-firebase-adminsdk-ytrb2-636ffb2c35.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://childhood-obesity-prevention.firebaseio.com"
});

// Initialize Cloud Firestore through Firebase
var db = admin.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.addUserToFirestore = functions.auth.user().onCreate(user => {
  let {
    displayName,
    email,
    emailVerified,
    photoURL,
    isAnonymous,
    uid,
    providerData
  } = user;

  let data = {
    displayName,
    email,
    emailVerified,
    photoURL,
    isAnonymous,
    uid,
    providerData
  };

  db.collection("users")
    .doc(user.uid)
    .set(data)
    .then(docRef => console.log("Document written with ID: ", docRef.id))
    .catch(error => console.error("Error adding document: ", error));
});
