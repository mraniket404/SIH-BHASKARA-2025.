import React, { useState } from 'react'
import { Calendar, Download, Printer, TrendingUp, TrendingDown } from 'lucide-react'

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15')

  const dailyStats = {
    date: '2024-01-15',
    availability: '99.8%',
    energyGenerated: '2450 MWh',
    peakLoad: '1850 MW',
    avgVoltage: '398.2 kV',
    faults: 2,
    maintenance: 1
  }

  const loadData = [
    { hour: '00:00', load: 1250, forecast: 1280 },
    { hour: '02:00', load: 1150, forecast: 1180 },
    { hour: '04:00', load: 1050, forecast: 1080 },
    { hour: '06:00', load: 1350, forecast: 1320 },
    { hour: '08:00', load: 1650, forecast: 1620 },
    { hour: '10:00', load: 1750, forecast: 1780 },
    { hour: '12:00', load: 1850, forecast: 1820 },
    { hour: '14:00', load: 1800, forecast: 1780 },
    { hour: '16:00', load: 1750, forecast: 1720 },
    { hour: '18:00', load: 1650, forecast: 1680 },
    { hour: '20:00', load: 1550, forecast: 1520 },
    { hour: '22:00', load: 1350, forecast: 1380 },
  ]

  const equipmentPerformance = [
    { asset: 'XFMR_400_1', availability: '100%', load: '78%', temp: '72°C' },
    { asset: 'XFMR_400_2', availability: '100%', load: '82%', temp: '68°C' },
    { asset: 'BREAKER_400_1', availability: '100%', operations: 12, status: 'Normal' },
    { asset: 'BREAKER_400_2', availability: '95%', operations: 8, status: 'Maintenance' },
    { asset: 'LINE_400_1', availability: '100%', load: '65%', temp: '45°C' },
  ]

  const maxLoad = Math.max(...loadData.map(d => Math.max(d.load, d.forecast)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-secondary text-sm flex items-center space-x-2">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
          <button className="btn-primary text-sm flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(dailyStats).map(([key, value]) => (
          <div key={key} className="card text-center">
            <div className="text-lg font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-xs text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Load Profile */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Load Profile</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Time</span>
              <span>Load (MW)</span>
            </div>
            <div className="space-y-3">
              {loadData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-16">{data.hour}</span>
                  <div className="flex-1 mx-4">
                    <div className="relative h-6 bg-gray-100 rounded">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                        style={{ width: `${(data.load / maxLoad) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 left-0 h-full border-l-2 border-red-500"
                        style={{ width: `${(data.forecast / maxLoad) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">{data.load}</span>
                    <div className="flex items-center">
                      {data.load > data.forecast ? (
                        <TrendingUp className="h-3 w-3 text-red-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 border-2 border-red-500"></div>
                <span>Forecast</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Performance</h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Availability</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Load/Temp</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipmentPerformance.map((equipment) => (
                  <tr key={equipment.asset}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {equipment.asset}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {equipment.availability}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {equipment.load || equipment.temp || equipment.operations}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        equipment.status === 'Normal' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {equipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Key Events */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Events - {selectedDate}</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-yellow-800">Scheduled Maintenance</div>
              <div className="text-sm text-yellow-700">BREAKER_400_2 - 14:00 to 16:00</div>
            </div>
            <span className="text-sm text-yellow-600">Completed</span>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-red-800">Fault Event</div>
              <div className="text-sm text-red-700">LINE_400_1 - Phase Loss - 12:15</div>
            </div>
            <span className="text-sm text-red-600">Resolved</span>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-blue-800">Load Shedding</div>
              <div className="text-sm text-blue-700">Peak load management - 18:30</div>
            </div>
            <span className="text-sm text-blue-600">Normal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyReport