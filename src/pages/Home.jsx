import { useEffect, useState } from "react"
import { listenPosts, deletePost, updatePost } from "../firebase/db"
import { useAuth } from "../context/AuthContext"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [editandoId, setEditandoId] = useState(null)
  const [textoEditado, setTextoEditado] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    const unsub = listenPosts(setPosts)
    return unsub
  }, [])

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta publicación?")) {
      await deletePost(id)
    }
  }

  const handleEditar = (post) => {
    setEditandoId(post.id)
    setTextoEditado(post.texto)
  }

  const handleGuardarEdicion = async (id) => {
    if (!textoEditado.trim()) return
    await updatePost(id, textoEditado)
    setEditandoId(null)
    setTextoEditado("")
  }

  const handleCancelar = () => {
    setEditandoId(null)
    setTextoEditado("")
  }

  return (
    <div className="page">
      <h2>Publicaciones</h2>
      {posts.length === 0 && (
        <p className="no-posts">No hay publicaciones aún. ¡Sé el primero!</p>
      )}
      <div className="posts-grid">
        {posts.map((p) => (
          <div className="post-card" key={p.id}>
            <div className="post-header">
              <div className="post-avatar">{p.autor?.charAt(0).toUpperCase()}</div>
              <span className="post-autor">@{p.autor}</span>
            </div>

            {editandoId === p.id ? (
              <div className="edit-container">
                <textarea
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                  rows={4}
                  className="edit-textarea"
                />
                <div className="edit-buttons">
                  <button className="btn-guardar" onClick={() => handleGuardarEdicion(p.id)}>
                    Guardar
                  </button>
                  <button className="btn-cancelar" onClick={handleCancelar}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="post-texto">{p.texto}</p>
            )}

            <small className="post-fecha">
              {p.fecha?.toDate().toLocaleString()}
            </small>

            {user && user.uid === p.uid && editandoId !== p.id && (
              <div className="post-actions">
                <button className="btn-editar" onClick={() => handleEditar(p)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => handleEliminar(p.id)}>
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}