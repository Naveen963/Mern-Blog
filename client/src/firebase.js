// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e2aa7.firebaseapp.com",
  projectId: "mern-blog-e2aa7",
  storageBucket: "mern-blog-e2aa7.appspot.com",
  messagingSenderId: "573463097802",
  appId: "1:573463097802:web:58de847791f8bdcf321f33",
  measurementId: "G-5XCJBC370G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
