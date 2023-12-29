// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBs_gLmZdmiLeTYgYTfuGV_uJHhuHBQwa0",
    authDomain: "chat-app-16d3c.firebaseapp.com",
    projectId: "chat-app-16d3c",
    storageBucket: "chat-app-16d3c.appspot.com",
    messagingSenderId: "2142431806",
    appId: "1:2142431806:web:bb23886e1e9c66ed187f6f",
    measurementId: "G-HC3KQBX0S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export default app;

export const auth = getAuth(app);
