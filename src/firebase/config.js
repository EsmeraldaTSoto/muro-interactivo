import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDfkDd08W5iwXtuGebW2c6Y7v-i_8sZFrY",
  authDomain: "muro-interactivo-3cd0b.firebaseapp.com",
  projectId: "muro-interactivo-3cd0b",
  storageBucket: "muro-interactivo-3cd0b.firebasestorage.app",
  messagingSenderId: "438177470473",
  appId: "1:438177470473:web:3e09d3124029dcc13040d8"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)