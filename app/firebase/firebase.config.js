// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD2kHqQJ9bRGSj7nCoKM83bH98GmvHHpQ",
  authDomain: "usabookstore-1c408.firebaseapp.com",
  projectId: "usabookstore-1c408",
  storageBucket: "usabookstore-1c408.appspot.com",
  messagingSenderId: "310695117933",
  appId: "1:310695117933:web:d990ab27893e86c57eab64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;