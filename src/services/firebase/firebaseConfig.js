import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyAxn0CTN0ALKnfy56DssscsBm7uqPIYQEQ",
    authDomain: "mwimobiliaria-627a3.firebaseapp.com",
    projectId: "mwimobiliaria-627a3",
    storageBucket: "mwimobiliaria-627a3.firebasestorage.app",
    messagingSenderId: "165509453773",
    appId: "1:165509453773:web:71f74417caa62481a7d684",
    measurementId: "G-4FL54KGXYV"
  };

  const firedb = firebase.initializeApp(firebaseConfig);

  export default firedb.database().ref();