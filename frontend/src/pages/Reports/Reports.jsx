import React, { useState } from 'react'
import FaultLogs from './FaultLogs'
import DailyReport from './DailyReport'
import MaintenanceSchedule from './MaintenanceSchedule'

const Reports = () => {
  const [activeTab, setActiveTab] = useState('faults')

  const tabs = [
    { id: 'faults', name: 'Fault Logs' },
    { id: 'daily', name: 'Daily Reports' },
    { id: 'maintenance', name: 'Maintenance Schedule' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="text-sm text-gray-500">
          Historical data and scheduled maintenance
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'faults' && <FaultLogs />}
        {activeTab === 'daily' && <DailyReport />}
        {activeTab === 'maintenance' && <MaintenanceSchedule />}
      </div>
    </div>
  )
}

export default Reports