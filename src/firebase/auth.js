import { auth, db } from "./config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export const register = async (email, password, nombre, apellido, usuario) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await setDoc(doc(db, "users", cred.user.uid), {
    usuario,
    nombre,
    apellido,
    email
  })
  return cred.user
}

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)