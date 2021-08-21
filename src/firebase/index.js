import 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDctCbgP2a9oWimIjWHkFHmWN6X5O0dttQ",
  authDomain: "condomine-102ee.firebaseapp.com",
  projectId: "condomine-102ee",
  storageBucket: "condomine-102ee.appspot.com",
  messagingSenderId: "236968077951",
  appId: "1:236968077951:web:94cebe581a8b7f8affed4a",
  measurementId: "G-7X7MTFZWFM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;