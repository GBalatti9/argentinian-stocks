// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getEnvironment } from "../../helpers/getEnvironment";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = getEnvironment();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB7AEfXw284aimDMUDL9sBaaY_ogNX2moI',
    authDomain: 'bullish-eb3ab.firebaseapp.com',
    projectId: 'bullish-eb3ab',
    storageBucket: 'bullish-eb3ab.appspot.com',
    messagingSenderId: '115564279133',
    appId: '1:115564279133:web:fe5dbd6d3b21dd31a6e4b4',
    measurementId: 'G-2V41RJ9DT6'
};

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseDB   = getFirestore( FirebaseApp );