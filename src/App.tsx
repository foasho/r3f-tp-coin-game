import { Canvas } from "@react-three/fiber";
import { Sky, Preload, Environment } from '@react-three/drei';
import React, { Suspense } from 'react';
import { InputControlProvider } from './hooks/useInputControl';
import { BVHWalk } from './canvas/BVHWalk'
import { DomUI } from './dom/DomUI'
import { CoinViewer } from "./dom/CoinViewer";

function App() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
      <CoinViewer />
      <InputControlProvider>
        <Canvas
          eventPrefix="client"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1
          }}>
          <Environment preset="sunset" background blur={0.7} />
          <pointLight position={[10, 10, 10]} />
          <Sky sunPosition={[500, 500, 500]} />
          <Suspense fallback={null}>
            <BVHWalk />
            <ambientLight intensity={0.75} />
            <pointLight position={[20, 30, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="blue" />
          </Suspense>
          <Preload all />
        </Canvas>
        <DomUI />
      </InputControlProvider>
    </div>
  )
}

export default App