import { useLocation, useNavigate } from 'react-router-dom'

import {
  TbChartInfographic,
  TbShieldCheckFilled,
  TbLayoutDashboardFilled,
  TbUsers,
} from "react-icons/tb";

import { PiStudentFill } from "react-icons/pi";
import { IoShieldCheckmark } from "react-icons/io5";

const navItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <TbLayoutDashboardFilled size={22} />
  },

  {
    path: '/students',
    label: 'Students',
    icon: <PiStudentFill size={22} />
  },
  
  {
    path: '/predict',
    label: 'Predict',
    icon: <TbChartInfographic size={22} />
  }
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-icon">
          <div className="logo-wrapper">

            <TbShieldCheckFilled />

            <div className="logo-badge">
              ✓
            </div>

          </div>
        </div>

        <div className="logo-text">
          Learn<span>Guard</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        {navItems.map(item => (

          <div
            key={item.path}
            className={`nav-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
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