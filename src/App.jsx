import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NewPost from "./pages/NewPost"
import { logout } from "./firebase/auth"

function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand"> ⛧°. ⋆༺ Muro Interactivo ༻⋆. °⛧ </Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/nuevo-post" className="btn-publicar">Publicar</Link>
            <button onClick={logout} className="btn-logout">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">Iniciar sesión</Link>
            <Link to="/registro" className="btn-registro">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  )
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/nuevo-post" element={
          <ProtectedRoute><NewPost /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}