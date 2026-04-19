import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { createPost } from "../firebase/db"
import { useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export default function NewPost() {
  const { user } = useAuth()
  const [texto, setTexto] = useState("")
  const [nombreUsuario, setNombreUsuario] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setNombreUsuario(data.usuario)
      }
    }
    fetchUser()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    try {
      await createPost(user.uid, nombreUsuario, texto)
      navigate("/")
    } catch (err) {
      setError("Error al publicar")
    }
  }

  return (
    <div className="form-container">
      <h2>Nueva publicación</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="¿Qué quieres compartir?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={5}
          required
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  )
}