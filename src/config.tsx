
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDrYwbTYMxJxvvxMEqAh6Z9gFL7e_IcFZA",
  authDomain: "testing-bdfac.firebaseapp.com",
  databaseURL: "https://testing-bdfac-default-rtdb.firebaseio.com",
  projectId: "testing-bdfac",
  storageBucket: "testing-bdfac.appspot.com",
  messagingSenderId: "512773439306",
  appId: "1:512773439306:web:0d6534cb3c38172fd7cbb3",
  measurementId: "G-JN6J6TE4PQ",
};

firebase.initializeApp(firebaseConfig);
export const dataRef = firebase.database();
export default firebase;
