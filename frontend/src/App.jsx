import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SocketProvider } from './contexts/SocketContext'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Monitoring from './pages/Monitoring/Monitoring'
import DigitalTwin from './pages/DigitalTwin/DigitalTwin'
import AssetHealth from './pages/AssetHealth/AssetHealth'
import AIAnalytics from './pages/AIAnalytics/AIAnalytics'
import Simulator from './pages/Simulator/Simulator'
import Reports from './pages/Reports/Reports'
import Settings from './pages/Settings/Settings'
import Login from './pages/Users/Login'

// Create a router with future flags
const routerConfig = {
  future: {
    v7_relativeSplatPath: true,
  },
}

function App() {
  return (
    <SocketProvider>
      <Router future={routerConfig.future}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="digital-twin" element={<DigitalTwin />} />
            <Route path="asset-health" element={<AssetHealth />} />
            <Route path="ai-analytics" element={<AIAnalytics />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </SocketProvider>
  )
}

export default App