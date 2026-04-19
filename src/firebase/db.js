import { db } from "./config"
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore"

export const listenPosts = (callback) => {
  const q = query(collection(db, "posts"), orderBy("fecha", "desc"))
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  )
}

export const createPost = (uid, autor, texto) =>
  addDoc(collection(db, "posts"), {
    uid,
    autor,
    texto,
    fecha: serverTimestamp()
  })

export const deletePost = (id) =>
  deleteDoc(doc(db, "posts", id))

export const updatePost = (id, texto) =>
  updateDoc(doc(db, "posts", id), { texto })