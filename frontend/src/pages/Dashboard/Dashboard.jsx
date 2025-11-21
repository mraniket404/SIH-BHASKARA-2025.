// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import OverviewCards from './OverviewCards'
import RealTimeCharts from '../Monitoring/RealTimeCharts'
import WarningAlerts from '../../components/monitoring/WarningAlerts'
import { useSocket } from '../../contexts/SocketContext'

const Dashboard = () => {
  const { anomalies } = useSocket()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots text-4xl mb-4">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600 animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2 animate-slide-in" style={{animationDelay: '0.1s'}}>
            EHV 400/220 kV Substation Monitoring
          </p>
        </div>
        <div className="text-sm text-gray-500 animate-slide-in" style={{animationDelay: '0.2s'}}>
          Real-time Overview
        </div>
      </div>

      <div className="stagger-animate">
        <OverviewCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <RealTimeCharts />
          </div>
          
          <div>
            <WarningAlerts anomalies={anomalies.slice(0, 10)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard