import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD1nNPgxxVGYDJi7qPGIKVUwhJujDDmt18",
    authDomain: "apolo11-c357e.firebaseapp.com",
    projectId: "apolo11-c357e",
    storageBucket: "apolo11-c357e.appspot.com",
    messagingSenderId: "602274960979",
    appId: "1:602274960979:web:c155c4a43caa5183ed58a6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);