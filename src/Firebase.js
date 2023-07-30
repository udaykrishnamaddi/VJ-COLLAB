import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCJma5vGxZnFHL--D17bF7k9h6oczbBJY",
  authDomain: "vj-collab-1.firebaseapp.com",
  projectId: "vj-collab-1",
  storageBucket: "vj-collab-1.appspot.com",
  messagingSenderId: "1037769952607",
  appId: "1:1037769952607:web:57783d572123441ecdfaea"
};



const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(app);


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.g
