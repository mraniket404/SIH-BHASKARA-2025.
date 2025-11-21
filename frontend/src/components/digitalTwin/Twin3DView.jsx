// src/components/digitalTwin/DigitalTwin3D.jsx
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Loader from '../common/Loader'

// Simple components to avoid complex 3D that might cause context loss
const TransformerModel = ({ position, onClick, isSelected, data }) => (
  <group position={position} onClick={onClick}>
    <mesh>
      <boxGeometry args={[1.5, 2, 1.5]} />
      <meshStandardMaterial color={isSelected ? '#3b82f6' : data?.status === 'warning' ? '#f59e0b' : '#6b7280'} />
    </mesh>
  </group>
)

const CircuitBreaker = ({ position, onClick, isSelected, data }) => (
  <group position={position} onClick={onClick}>
    <mesh>
      <cylinderGeometry args={[0.5, 0.5, 1.5, 16]} />
      <meshStandardMaterial color={isSelected ? '#3b82f6' : data?.status === 'open' ? '#ef4444' : '#10b981'} />
    </mesh>
  </group>
)

const Busbar = ({ position, length, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[length, 0.05, 0.05]} />
    <meshStandardMaterial color="#f59e0b" />
  </mesh>
)

const DigitalTwin3D = ({ onAssetSelect, assetData }) => {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [contextLost, setContextLost] = useState(false)

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset)
    onAssetSelect(asset)
  }

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = (event) => {
      console.warn('WebGL context lost')
      event.preventDefault()
      setContextLost(true)
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored')
      setContextLost(false)
    }

    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      }
    }
  }, [])

  const substationLayout = {
    transformers: [
      { id: 'XFMR_400_1', type: 'transformer', position: [-3, 1, 0], data: assetData['XFMR_400_1'] },
      { id: 'XFMR_400_2', type: 'transformer', position: [3, 1, 0], data: assetData['XFMR_400_2'] }
    ],
    breakers: [
      { id: 'BREAKER_400_1', type: 'breaker', position: [-5, 0.5, -2], data: assetData['BREAKER_400_1'] },
      { id: 'BREAKER_400_2', type: 'breaker', position: [5, 0.5, -2], data: assetData['BREAKER_400_2'] }
    ],
    busbars: [
      { position: [0, 2, -3], length: 12, rotation: [0, 0, 0] },
      { position: [0, 1.5, 2], length: 8, rotation: [0, 0, 0] },
    ]
  }

  if (contextLost) {
    return (
      <div className="card h-96 lg:h-[500px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg font-semibold mb-2">3D View Temporarily Unavailable</div>
          <p className="text-sm">WebGL context was lost. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card h-96 lg:h-[500px]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">3D Substation Overview</h3>
      
      <Suspense fallback={<Loader className="h-64" />}>
        <Canvas
          camera={{ position: [10, 8, 10], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]} // Lower DPR for better performance
        >
          <color attach="background" args={['#f8fafc']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
          />
          
          {/* Grid */}
          <gridHelper args={[20, 20, '#e2e8f0', '#f1f5f9']} />
          
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
        </Canvas>
      </Suspense>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Click on equipment to view details. Drag to rotate, scroll to zoom.</p>
      </div>
    </div>
  )
}

export default DigitalTwin3D