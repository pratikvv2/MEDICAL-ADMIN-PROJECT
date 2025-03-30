// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

 

// Your web app's Firebase configuration
// eslint-disable-next-line no-undef

let   firebaseConfig = {
        apiKey: "AIzaSyAPHEDwxqbx10wtmtSUUIy--F6F4dyjCvk",
        authDomain: "getmobileiv.firebaseapp.com",
        projectId: "getmobileiv",
        storageBucket: "getmobileiv.appspot.com",
        messagingSenderId: "743395832799",
        appId: "1:743395832799:web:8cacb44e650ecaa8eb4a6a",
        measurementId: "G-8S4YGJT51T"
    };



// Initialize Firebase
const APP = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const FIRESTORE = getFirestore(APP);
// const STORAGE = getStorage(APP);
const AUTH = getAuth(APP);


export {
    APP,
    FIRESTORE,
    // STORAGE,
    AUTH
}