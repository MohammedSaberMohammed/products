import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "products-25bb1.firebaseapp.com",
  projectId: "products-25bb1",
  storageBucket: "products-25bb1.appspot.com",
  messagingSenderId: "598309975662",
  appId: "1:598309975662:web:fc1168ba525d75129f587f",
  measurementId: "G-FNJESEVZ9Z"
};

// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;