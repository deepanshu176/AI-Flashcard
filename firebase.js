// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl6rUGe4T6Aw-caCZn_OeuYhuCfAmmyck",
  authDomain: "flashcardsaas-bf451.firebaseapp.com",
  projectId: "flashcardsaas-bf451",
  storageBucket: "flashcardsaas-bf451.appspot.com",
  messagingSenderId: "856491044600",
  appId: "1:856491044600:web:e390504d8bed72cab4150d",
  measurementId: "G-JMQ0M1BDWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const db = getFirestore(app);
export { db };
