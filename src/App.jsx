import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import AddStory from './Pages/AddStory'
import StoryDetails from './Pages/StoryDetails'
import ViewStory from './Pages/ViewStory'
import UpdateStory from './Pages/UpdateStory'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AddStory" element={<AddStory />} />
          <Route path="/ViewStory" element={<ViewStory />} />
          <Route path="/UpdateStory/:id" element={<UpdateStory />} />
          <Route path="/Story/:id" element={<StoryDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
