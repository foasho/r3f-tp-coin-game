import React, { Suspense, useMemo } from 'react'
import { Bvh, MeshReflectorMaterial } from '@react-three/drei'
import { Vector3, Euler, Group, Color } from 'three'
import seedrandom from "seedrandom"

const RandomBox = ({ index, fieldSize, maxHeight, maxSize }: { index: number; fieldSize: number; maxHeight: number; maxSize: number }) => {
  const seed = 10284221679
  // シードとインデックスを用いた乱数生成器を初期化
  const rng = seedrandom((seed + index).toString());

  // X: -fieldSize/2~fieldSize/2, Y: 0~maxHeight, Z: -fieldSize/2~fieldSize/2の範囲でランダムに配置
  const p = new Vector3(rng() * fieldSize - fieldSize / 2, rng() * maxHeight, rng() * fieldSize - fieldSize / 2)
  const r = new Euler(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI)
  // 1~3のランダムなサイズ
  const size: number = rng() * maxSize
  const color = useMemo(() => {
    return new Color().setHSL(rng(), 1.0, 0.5)
  }, [])
  return (
    <mesh position={p} rotation={r} scale={size} castShadow receiveShadow>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export const Field = ({ grp }: { grp: React.RefObject<Group> }) => {
  const fieldSize = 128
  const mirrorResolution = 256
  return (
    <Bvh>
      <Suspense>
        <group ref={grp} renderOrder={0}>
          {/** フロア */}
          <mesh
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.002, 0]}
            scale={[fieldSize, fieldSize, 1]}
            name="ground">
            <planeGeometry />
            <MeshReflectorMaterial mirror={1} resolution={mirrorResolution} />
          </mesh>
          {/** 1000個のBoxes, 位置も回転もばらばら */}
          {[...Array(1000)].map((_, i) => (
            <RandomBox key={i} index={i} fieldSize={fieldSize} maxHeight={6} maxSize={3} />
          ))}
        </group>
      </Suspense>
    </Bvh>
  )
}
