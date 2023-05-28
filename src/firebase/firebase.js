import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAznggo3f8oBD3nKwN2rSDOv_FoUIn7JFM",
    authDomain: "passwordmanager-323b8.firebaseapp.com",
    projectId: "passwordmanager-323b8",
    storageBucket: "passwordmanager-323b8.appspot.com",
    messagingSenderId: "461913880039",
    appId: "1:461913880039:web:da622eea73234e914f7942",
    measurementId: "G-3DL3DP95VC"
  };
  
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
