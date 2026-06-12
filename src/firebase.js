// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzUVeXW-6x_b92nASSOBD2A66gi-WLgeY",
  authDomain: "shoping-list-app-33206.firebaseapp.com",
  projectId: "shoping-list-app-33206",
  storageBucket: "shoping-list-app-33206.firebasestorage.app",
  messagingSenderId: "773336068934",
  appId: "1:773336068934:web:fa95e087f861944fe0ab47",
  measurementId: "G-XC71JXLV2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);