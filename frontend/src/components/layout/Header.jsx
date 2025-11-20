import React from 'react'
import { Menu, Bell, User } from 'lucide-react'
import { useSocket } from '../../contexts/SocketContext'

const Header = ({ onMenuClick }) => {
  const { isConnected, anomalies } = useSocket()
  
  const criticalAlerts = anomalies.filter(a => a.severity === 'critical' && !a.acknowledged).length

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center ml-4 lg:ml-0">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-500">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-400" />
            {criticalAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {criticalAlerts}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Operator</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header