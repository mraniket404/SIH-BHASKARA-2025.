// src/pages/Dashboard/OverviewCards.jsx
import React from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { 
  Zap, 
  Thermometer, 
  Gauge, 
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown
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
      change: '+0.2%',
      trend: 'up',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Transformer Temp',
      value: `${getLatestValue('XFMR_400_1', 'temperature').toFixed(1)} °C`,
      icon: Thermometer,
      status: getLatestValue('XFMR_400_1', 'temperature') > 85 ? 'critical' : 'normal',
      change: '+1.5°C',
      trend: 'up',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Line Current',
      value: `${getLatestValue('LINE_400_1', 'current').toFixed(1)} A`,
      icon: Activity,
      status: 'normal',
      change: '-0.3%',
      trend: 'down',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'System Frequency',
      value: `${getLatestValue('BUS_400_1', 'frequency').toFixed(2)} Hz`,
      icon: Gauge,
      status: 'normal',
      change: '0.0%',
      trend: 'stable',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 animate-pulse'
      case 'warning': return 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700'
      default: return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500 animate-float" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500 animate-bounce" />
      default: return <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animate">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="card group hover:scale-105 transition-all duration-500 cursor-pointer"
          style={{animationDelay: `${index * 0.1}s`}}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-2">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{card.value}</p>
              <div className="flex items-center space-x-2">
                {getTrendIcon(card.trend)}
                <p className={`text-sm font-medium ${
                  card.trend === 'up' ? 'text-green-600' : 
                  card.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {card.change}
                </p>
              </div>
            </div>
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${card.color} text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
          
          {card.status !== 'normal' && (
            <div className="flex items-center mt-4 p-2 rounded-lg animate-pulse">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2 animate-bounce" />
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(card.status)}`}>
                {card.status === 'critical' ? 'Critical' : 'Warning'}
              </span>
            </div>
          )}

          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-20 pointer-events-none"></div>
        </div>
      ))}
    </div>
  )
}

export default OverviewCards