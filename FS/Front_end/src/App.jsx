import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Predict from './pages/Predict'

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/"          element={<Dashboard />} />
            <Route path="/students"  element={<Students />} />
            <Route path="/predict"   element={<Predict />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
