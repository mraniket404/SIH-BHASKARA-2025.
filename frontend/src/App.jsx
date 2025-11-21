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

function App() {
  return (
    <SocketProvider>
      <Router>
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
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </SocketProvider>
  )
}

export default App