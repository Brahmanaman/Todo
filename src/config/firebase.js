// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFJ9lZPhet5Azcz-wpjzP-zHFSML7SDT8",
    authDomain: "react-todo-37d8f.firebaseapp.com",
    projectId: "react-todo-37d8f",
    storageBucket: "react-todo-37d8f.firebasestorage.app",
    messagingSenderId: "848220786836",
    appId: "1:848220786836:web:a6db442816fc88ea67a481",
    measurementId: "G-T1SMYJR8TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore and get a reference to the service
const db = getFirestore(app);
export { db };