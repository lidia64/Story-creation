import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import AddStory from './Pages/AddStory'
import StoryDetails from './Pages/StoryDetails'
import ViewStory from './Pages/ViewStory'
import UpdateStory from './Pages/UpdateStory'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { useAuth } from './Context/AuthContext'
import './App.css'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ViewStory" element={<ViewStory />} />
          <Route path="/Story/:id" element={<StoryDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AddStory" element={<ProtectedRoute><AddStory /></ProtectedRoute>} />
          <Route path="/UpdateStory/:id" element={<ProtectedRoute><UpdateStory /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
