import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCq-XRhlQyULd8-brVcFHvfgNKZ_mBg8zY",
    authDomain: "marioplan-7f710.firebaseapp.com",
    databaseURL: "https://marioplan-7f710.firebaseio.com",
    projectId: "marioplan-7f710",
    storageBucket: "marioplan-7f710.appspot.com",
    messagingSenderId: "572108780402",
    appId: "1:572108780402:web:bf8a0705fb02cbe15d23eb",
    measurementId: "G-LX7850EBSD"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;