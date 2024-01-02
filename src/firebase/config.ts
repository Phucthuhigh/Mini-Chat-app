// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaWNuh5QxN26aDvC4jIHtChRLn76WwjHY",
    authDomain: "mini-chat-app-a079e.firebaseapp.com",
    projectId: "mini-chat-app-a079e",
    storageBucket: "mini-chat-app-a079e.appspot.com",
    messagingSenderId: "800473934627",
    appId: "1:800473934627:web:a67803a15fe2a6bd25fa96",
    measurementId: "G-QLNN8C7298",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
