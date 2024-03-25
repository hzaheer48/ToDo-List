// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaRd1IHYUIo4pBwakL5pV6YgyZYbkOLPc",
  authDomain: "todolist-a1b84.firebaseapp.com",
  projectId: "todolist-a1b84",
  storageBucket: "todolist-a1b84.appspot.com",
  messagingSenderId: "1047505679039",
  appId: "1:1047505679039:web:8afe94fef7272b3ae34c0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);