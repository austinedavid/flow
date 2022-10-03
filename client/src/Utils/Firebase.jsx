// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDK-McL2SuD3PA9QMNFaxS1e5x0XJR-uUc",
  authDomain: "davidchats-cf908.firebaseapp.com",
  projectId: "davidchats-cf908",
  storageBucket: "davidchats-cf908.appspot.com",
  messagingSenderId: "81003192510",
  appId: "1:81003192510:web:8b255fa5d9d09fc2463eef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export default app