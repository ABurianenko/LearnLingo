import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXQunkvHvf6KJTzypaK40TWIl5D9XIWAw",
    authDomain: "learnlingo-8e67d.firebaseapp.com",
    projectId: "learnlingo-8e67d",
    storageBucket: "learnlingo-8e67d.firebasestorage.app",
    messagingSenderId: "1006830642961",
    appId: "1:1006830642961:web:dc5ec4ddbf9419819e4eb0",
    measurementId: "G-VEK1PFLP5K",
    databaseURL: "https://learnlingo-8e67d-default-rtdb.firebaseio.com",
};
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);