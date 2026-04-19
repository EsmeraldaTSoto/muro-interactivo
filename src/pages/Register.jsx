import { useState } from "react"
import { register } from "../firebase/auth"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ nombre: "", apellido: "", usuario: "", email: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await register(form.email, form.password, form.nombre, form.apellido, form.usuario)
      navigate("/")
    } catch (err) {
      setError("Error al registrarse: " + err.message)
    }
  }

  return (
    <div className="form-container">
      <h2>Crear cuenta</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
        <input name="usuario" placeholder="Usuario" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  )
}