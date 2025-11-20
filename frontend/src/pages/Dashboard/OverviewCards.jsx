import React from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { 
  Zap, 
  Thermometer, 
  Gauge, 
  Activity,
  AlertTriangle 
} from 'lucide-react'

const OverviewCards = () => {
  const { sensorData } = useSocket()

  const getLatestValue = (assetId, sensorType) => {
    return sensorData[assetId]?.[sensorType]?.value || 0
  }

  const cards = [
    {
      title: 'Bus Voltage',
      value: `${getLatestValue('BUS_400_1', 'voltage').toFixed(1)} kV`,
      icon: Zap,
      status: getLatestValue('BUS_400_1', 'voltage') > 420 ? 'warning' : 'normal',
      change: '+0.2%'
    },
    {
      title: 'Transformer Temp',
      value: `${getLatestValue('XFMR_400_1', 'temperature').toFixed(1)} °C`,
      icon: Thermometer,
      status: getLatestValue('XFMR_400_1', 'temperature') > 85 ? 'critical' : 'normal',
      change: '+1.5°C'
    },
    {
      title: 'Line Current',
      value: `${getLatestValue('LINE_400_1', 'current').toFixed(1)} A`,
      icon: Activity,
      status: 'normal',
      change: '-0.3%'
    },
    {
      title: 'System Frequency',
      value: `${getLatestValue('BUS_400_1', 'frequency').toFixed(2)} Hz`,
      icon: Gauge,
      status: 'normal',
      change: '0.0%'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-green-600 bg-green-50'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              <p className={`text-sm ${card.status === 'normal' ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {card.change}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getStatusColor(card.status)}`}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
          
          {card.status !== 'normal' && (
            <div className="flex items-center mt-3 text-sm">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">
                {card.status === 'critical' ? 'Critical' : 'Warning'}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default OverviewCards