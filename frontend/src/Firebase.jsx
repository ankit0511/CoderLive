// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0jCo6MGcZYvYUXgadaM3YvQa1pthS48Y",
  authDomain: "pair-pro-e0052.firebaseapp.com",
  projectId: "pair-pro-e0052",
  storageBucket: "pair-pro-e0052.appspot.com",
  messagingSenderId: "109074655207",
  appId: "1:109074655207:web:5ca90b2493bb0e044c3f42",
  measurementId: "G-L5CCGFQEND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export { signInWithPopup, signOut };

export default app;