// src/components/layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Monitor, 
  Square, 
  Heart, 
  Brain, 
  Play, 
  FileText,
  Settings,
  X,
  Zap
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500' },
  { name: 'Monitoring', href: '/monitoring', icon: Monitor, color: 'from-green-500 to-emerald-500' },
  { name: 'Digital Twin', href: '/digital-twin', icon: Square, color: 'from-purple-500 to-pink-500' },
  { name: 'Asset Health', href: '/asset-health', icon: Heart, color: 'from-red-500 to-orange-500' },
  { name: 'AI Analytics', href: '/ai-analytics', icon: Brain, color: 'from-indigo-500 to-purple-500' },
  { name: 'Simulator', href: '/simulator', icon: Play, color: 'from-amber-500 to-yellow-500' },
  { name: 'Reports', href: '/reports', icon: FileText, color: 'from-gray-500 to-slate-500' },
  { name: 'Settings', href: '/settings', icon: Settings, color: 'from-slate-500 to-gray-500' },
]

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${open ? 'fixed inset-0 z-40' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white animate-pulse" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EHV Digital Twin
              </h1>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:translate-x-2 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setOpen(false)}
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <item.icon className={`mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                  navigation.find(n => n.href === item.href) ? 'animate-pulse' : ''
                }`} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-100 bg-white">
          <div className="flex items-center h-16 px-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-float">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EHV Digital Twin
              </h1>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:translate-x-2 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105 animate-pulse`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <item.icon className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar