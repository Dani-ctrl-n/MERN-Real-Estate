// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-30b4b.firebaseapp.com",
  projectId: "mern-real-estate-30b4b",
  storageBucket: "mern-real-estate-30b4b.appspot.com",
  messagingSenderId: "314582433336",
  appId: "1:314582433336:web:c7fae5deb86b3bb79ab0cd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
