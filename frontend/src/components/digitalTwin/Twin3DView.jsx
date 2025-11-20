import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import Loader from '../common/Loader'

// 3D Asset Components
const TransformerModel = ({ position, onClick, isSelected, data }) => (
  <group position={position} onClick={onClick}>
    <mesh>
      <cylinderGeometry args={[1.5, 1.5, 3, 16]} />
      <meshStandardMaterial color={isSelected ? '#3b82f6' : data?.status === 'warning' ? '#f59e0b' : '#6b7280'} />
    </mesh>
    {/* Cooling fins */}
    {Array.from({ length: 8 }).map((_, i) => (
      <mesh key={i} position={[0, 0, 1.5]} rotation={[0, (i * Math.PI) / 4, 0]}>
        <boxGeometry args={[2.5, 0.1, 0.3]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
    ))}
    {data && (
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color={data.status === 'critical' ? '#ef4444' : '#000000'}
        anchorX="center"
        anchorY="middle"
      >
        {data.temperature}°C
      </Text>
    )}
  </group>
)

const CircuitBreaker = ({ position, onClick, isSelected, data }) => (
  <group position={position} onClick={onClick}>
    <mesh>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={isSelected ? '#3b82f6' : data?.status === 'open' ? '#ef4444' : '#10b981'} />
    </mesh>
    <mesh position={[0, 1.2, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  </group>
)

const Busbar = ({ position, length, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[length, 0.1, 0.1]} />
    <meshStandardMaterial color="#f59e0b" />
  </mesh>
)

const TransmissionLine = ({ start, end }) => {
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) +
    Math.pow(end[1] - start[1], 2) +
    Math.pow(end[2] - start[2], 2)
  )
  
  const center = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ]
  
  const direction = [
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  ]
  
  return (
    <mesh position={center}>
      <cylinderGeometry args={[0.05, 0.05, length, 8]} />
      <meshStandardMaterial color="#84cc16" />
      <mesh rotation={[
        Math.atan2(direction[1], Math.sqrt(direction[0]**2 + direction[2]**2)),
        0,
        Math.atan2(direction[0], direction[2])
      ]} />
    </mesh>
  )
}

const Twin3DView = ({ onAssetSelect, assetData }) => {
  const [selectedAsset, setSelectedAsset] = useState(null)

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset)
    onAssetSelect(asset)
  }

  const substationLayout = {
    transformers: [
      { id: 'XFMR_400_1', type: 'transformer', position: [-5, 1.5, 0], data: assetData['XFMR_400_1'] },
      { id: 'XFMR_400_2', type: 'transformer', position: [5, 1.5, 0], data: assetData['XFMR_400_2'] }
    ],
    breakers: [
      { id: 'BREAKER_400_1', type: 'breaker', position: [-8, 1, -3], data: assetData['BREAKER_400_1'] },
      { id: 'BREAKER_400_2', type: 'breaker', position: [8, 1, -3], data: assetData['BREAKER_400_2'] },
      { id: 'BREAKER_220_1', type: 'breaker', position: [-3, 1, 4], data: assetData['BREAKER_220_1'] },
      { id: 'BREAKER_220_2', type: 'breaker', position: [3, 1, 4], data: assetData['BREAKER_220_2'] }
    ],
    busbars: [
      { position: [0, 3, -4], length: 20, rotation: [0, 0, 0] }, // 400kV bus
      { position: [0, 2, 4], length: 12, rotation: [0, 0, 0] },  // 220kV bus
    ],
    lines: [
      { start: [-8, 3, -4], end: [-5, 3, 0] },
      { start: [8, 3, -4], end: [5, 3, 0] },
      { start: [-5, 2, 0], end: [-3, 2, 4] },
      { start: [5, 2, 0], end: [3, 2, 4] }
    ]
  }

  return (
    <div className="card h-96 lg:h-[500px]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">3D Digital Twin</h3>
      
      <Suspense fallback={<Loader className="h-64" />}>
        <Canvas camera={{ position: [15, 15, 15], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[-10, 10, 5]} intensity={0.5} />
          
          <Environment preset="city" />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          
          {/* Grid */}
          <gridHelper args={[30, 30, '#bbb', '#ddd']} rotation={[0, 0, 0]} />
          
          {/* Coordinate axes */}
          <axesHelper args={[5]} />
          
          {/* Assets */}
          {substationLayout.transformers.map((asset) => (
            <TransformerModel
              key={asset.id}
              position={asset.position}
              onClick={() => handleAssetClick(asset)}
              isSelected={selectedAsset?.id === asset.id}
              data={asset.data}
            />
          ))}
          
          {substationLayout.breakers.map((asset) => (
            <CircuitBreaker
              key={asset.id}
              position={asset.position}
              onClick={() => handleAssetClick(asset)}
              isSelected={selectedAsset?.id === asset.id}
              data={asset.data}
            />
          ))}
          
          {/* Busbars */}
          {substationLayout.busbars.map((busbar, index) => (
            <Busbar
              key={index}
              position={busbar.position}
              length={busbar.length}
              rotation={busbar.rotation}
            />
          ))}
          
          {/* Transmission Lines */}
          {substationLayout.lines.map((line, index) => (
            <TransmissionLine
              key={index}
              start={line.start}
              end={line.end}
            />
          ))}
        </Canvas>
      </Suspense>
      
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Normal</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Warning</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Critical</span>
        </div>
      </div>
    </div>
  )
}

export default Twin3DView