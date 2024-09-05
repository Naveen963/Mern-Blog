import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e2aa7.firebaseapp.com",
  projectId: "mern-blog-e2aa7",
  storageBucket: "mern-blog-e2aa7.appspot.com",
  messagingSenderId: "573463097802",
  appId: "1:573463097802:web:58de847791f8bdcf321f33",
  measurementId: "G-5XCJBC370G",
};

export const app = initializeApp(firebaseConfig);
