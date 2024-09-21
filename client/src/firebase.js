// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-blog-55d20.firebaseapp.com",
  projectId: "mern-blog-55d20",
  storageBucket: "mern-blog-55d20.appspot.com",
  messagingSenderId: "151942609206",
  appId: "1:151942609206:web:20e0916fb4257f60779b97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);