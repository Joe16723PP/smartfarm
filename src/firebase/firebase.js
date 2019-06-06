import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyD4aUaxJrXQAiQvbJADNCOzvpMs9KKFrGE",
  authDomain: "smartfarmproject-c8cc4.firebaseapp.com",
  databaseURL: "https://smartfarmproject-c8cc4.firebaseio.com",
  projectId: "smartfarmproject-c8cc4",
  storageBucket: "smartfarmproject-c8cc4.appspot.com",
  messagingSenderId: "320209973173"
};

const devConfig = {
  apiKey: "AIzaSyD4aUaxJrXQAiQvbJADNCOzvpMs9KKFrGE",
  authDomain: "smartfarmproject-c8cc4.firebaseapp.com",
  databaseURL: "https://smartfarmproject-c8cc4.firebaseio.com",
  projectId: "smartfarmproject-c8cc4",
  storageBucket: "smartfarmproject-c8cc4.appspot.com",
  messagingSenderId: "320209973173"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
