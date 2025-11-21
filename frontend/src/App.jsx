// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SocketProvider } from './contexts/SocketContext'
import MainLayout from './components/layout/MainLayout'

// Page Imports
import Dashboard from './pages/Dashboard/Dashboard'
import Monitoring from './pages/Monitoring/Monitoring'
import DigitalTwin from './pages/DigitalTwin/DigitalTwin'
import AssetHealth from './pages/AssetHealth/AssetHealth'
import AIAnalytics from './pages/AIAnalytics/AIAnalytics'
import Simulator from './pages/Simulator/Simulator'
import FaultSimulator from './pages/Simulator/FaultSimulator'
import Reports from './pages/Reports/Reports'
import Settings from './pages/Settings/Settings'
import Login from './pages/Users/Login'
import Register from './pages/Users/Register'
import RoleManager from './pages/Users/RoleManager'
import Profile from './pages/Users/Profile'

// Router configuration with future flags
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
  },
}

function App() {
  return (
    <SocketProvider>
      <Router future={routerConfig.future}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes with Layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="digital-twin" element={<DigitalTwin />} />
            <Route path="asset-health" element={<AssetHealth />} />
            <Route path="ai-analytics" element={<AIAnalytics />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="fault-simulator" element={<FaultSimulator />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user-management" element={<RoleManager />} />
          </Route>
          
          {/* 404 Fallback */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">404 - Page Not Found</h1>
                <p className="text-gray-600">The requested page could not be found.</p>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </SocketProvider>
  )
}

export default App