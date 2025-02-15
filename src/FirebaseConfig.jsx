// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM",
  authDomain: "expense-tracker-da8bb.firebaseapp.com",
  databaseURL: "https://expense-tracker-da8bb-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-da8bb",
  storageBucket: "expense-tracker-da8bb.firebasestorage.app",
  messagingSenderId: "310070996053",
  appId: "1:310070996053:web:97a332b4848a118afcb8dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}