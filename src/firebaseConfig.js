import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC3wAienMNafBFjm93evb8ja_I9H8Bj_EI",
  authDomain: "mycart-d869b.firebaseapp.com",
  projectId: "mycart-d869b",
  storageBucket: "mycart-d869b.appspot.com",
  messagingSenderId: "714788175986",
  appId: "1:714788175986:web:def4a82dcc5e178c2bc2eb",
  measurementId: "G-GH62CZ9EVM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app)