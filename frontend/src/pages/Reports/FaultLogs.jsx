import React, { useState } from 'react'
import { Download, Filter, Search } from 'lucide-react'

const FaultLogs = () => {
  const [dateRange, setDateRange] = useState('7d')
  const [severityFilter, setSeverityFilter] = useState('all')

  const faultLogs = [
    {
      id: 'F001',
      timestamp: '2024-01-15 14:23:45',
      asset: 'XFMR_400_1',
      faultType: 'Over Temperature',
      severity: 'High',
      duration: '2.5 min',
      action: 'Auto Shutdown',
      status: 'Resolved'
    },
    {
      id: 'F002',
      timestamp: '2024-01-15 12:15:30',
      asset: 'LINE_400_1',
      faultType: 'Phase Loss',
      severity: 'Critical',
      duration: '45 sec',
      action: 'Breaker Trip',
      status: 'Resolved'
    },
    {
      id: 'F003',
      timestamp: '2024-01-14 18:45:12',
      asset: 'BREAKER_400_2',
      faultType: 'Mechanical Failure',
      severity: 'High',
      duration: '15 min',
      action: 'Manual Intervention',
      status: 'Under Maintenance'
    },
    {
      id: 'F004',
      timestamp: '2024-01-14 09:30:22',
      asset: 'BUS_400_1',
      faultType: 'Voltage Dip',
      severity: 'Medium',
      duration: '30 sec',
      action: 'Auto Recovery',
      status: 'Resolved'
    },
    {
      id: 'F005',
      timestamp: '2024-01-13 22:10:05',
      asset: 'XFMR_400_2',
      faultType: 'Oil Level Low',
      severity: 'Medium',
      duration: '5 min',
      action: 'Alarm Only',
      status: 'Resolved'
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'text-green-600'
      case 'Under Maintenance': return 'text-yellow-600'
      case 'Investigating': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const filteredLogs = faultLogs.filter(log => 
    severityFilter === 'all' || log.severity === severityFilter
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          
          <select 
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search faults..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button className="btn-primary text-sm flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fault ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fault Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action Taken
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.faultType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={getStatusColor(log.status)}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredLogs.length} of {faultLogs.length} faults
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">2</div>
          <div className="text-sm text-gray-600">Critical Faults (24h)</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">8</div>
          <div className="text-sm text-gray-600">Total Faults (7d)</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">94.2%</div>
          <div className="text-sm text-gray-600">Availability</div>
        </div>
      </div>
    </div>
  )
}

export default FaultLogs