// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "firebase/firestore"
import{getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7mJqq2ZKbQY39mabSFJfqoKa3XQ_H1Vg",
  authDomain: "netflix-5fd4d.firebaseapp.com",
  projectId: "netflix-5fd4d",
  storageBucket: "netflix-5fd4d.firebasestorage.app",
  messagingSenderId: "841365948332",
  appId: "1:841365948332:web:607d89099d5a76738ddc09",
  measurementId: "G-XN8KVFGL7W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)
const analytics = getAnalytics(app);