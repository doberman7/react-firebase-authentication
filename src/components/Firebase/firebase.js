import app from "firebase/app";
import "firebase/auth";
import 'firebase/database';

const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();// initialize the Real-time Database API for our Firebase class

  }
  // *** Auth API ***
  //se incluye el prefijo do... a los métodos, de tal q no se necesita agregar firebase.auth()....como en firebase.auth().signInWithEmailAndPassword(email, password)
  //Crea un formulario que permita a los usuarios nuevos registrarse en la app mediante su dirección de correo electrónico y una contraseña. Cuando un usuario complete el formulario, valida la dirección de correo electrónico y la contraseña que proporcionó para después pasarlos al método createUserWithEmailAndPassword:
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  // set up the login/sign-in function
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  //In case of the sign out function, we don’t need to pass any arguments to it, because Firebase knows about the currently authenticated user.
  doSignOut = () => this.auth.signOut();
  //There are two more authentication methods to reset and change a password for an authenticated user:
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
    user = uid => this.db.ref(`users/${uid}`);//he paths in the ref() method match the location where our entities (users) will be stored in Firebase’s Real-time Database API.

    users = () => this.db.ref('users');  
}

export default Firebase;
