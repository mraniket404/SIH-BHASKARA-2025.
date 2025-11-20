import React from 'react'
import OverviewCards from './OverviewCards'
import RealTimeCharts from '../Monitoring/RealTimeCharts'
import WarningAlerts from '../../components/monitoring/WarningAlerts'
import { useSocket } from '../../contexts/SocketContext'

const Dashboard = () => {
  const { anomalies } = useSocket()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          EHV 400/220 kV Substation Monitoring
        </div>
      </div>

      <OverviewCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RealTimeCharts />
        </div>
        
        <div>
          <WarningAlerts anomalies={anomalies.slice(0, 10)} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard