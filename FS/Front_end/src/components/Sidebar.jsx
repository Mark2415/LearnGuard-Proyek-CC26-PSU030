import { useLocation, useNavigate } from 'react-router-dom'
import { TbChartInfographic } from "react-icons/tb";

const navItems = [
  { path: '/',          label: 'Dashboard',  icon: '📊' },
  { path: '/students',  label: 'Students',   icon: '👥' },
  { path: '/predict', label: 'Predict',  icon: <TbChartInfographic size={20} /> }
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Learn<span>Guard</span></div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <div
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}
