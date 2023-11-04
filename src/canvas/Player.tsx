import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, Vector3, Euler, Group, AnimationClip, AnimationAction, AnimationMixer } from 'three';
import { PlayerControl } from './PlayerControls';
import { EDeviceType } from '../utils/model';
import { usePlayerStore } from '../utils/store';

export const detectDeviceType = (): EDeviceType => {
  if (typeof window !== 'undefined') {
    // check if window is defined (we are on client side)
    const ua = navigator.userAgent
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
      return EDeviceType.Mobile
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
      return EDeviceType.Tablet
    } else if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)) {
      return EDeviceType.Tablet
    } else {
      return EDeviceType.Desktop
    }
  } else {
    return EDeviceType.Unknown // as a default, return "desktop" when window is not defined (we are on server side)
  }
}

/**
 * プレイヤー
 */
interface IPlayerProps {
  grp: React.RefObject<Group>
  objectURL: string
  initPosition?: Vector3
  initRotation?: Euler
  scale?: number
}
export const Player = ({
  grp,
  objectURL,
  initPosition = new Vector3(0, 3, 0),
  initRotation = new Euler(0, 0, 0),
  scale = 0.75
}: IPlayerProps) => {
  const playerRef = useRef<Mesh>(null)
  const { setPlayerRef } = usePlayerStore();
  const [device, setDevice] = useState<EDeviceType>(EDeviceType.Unknown)
  const { scene, animations } = useGLTF(objectURL) as any
  const [mixer, setMixer] = useState<AnimationMixer>()
  const [myActions, setMyActions] = useState<{ [x: string]: AnimationAction }>({})
  const p = initPosition ? initPosition : new Vector3(0, 0, 0)

  useEffect(() => {
    if (scene && animations) {
      const _mixer = new AnimationMixer(scene)
      setMixer(_mixer)
      const _actions: { [x: string]: AnimationAction } = {}
      animations.forEach((clip: AnimationClip) => {
        _actions[clip.name] = _mixer.clipAction(clip)
      })
      setMyActions(_actions)
    }
    setDevice(detectDeviceType());
    // Storeに保持
    setPlayerRef(playerRef);
  }, [scene, animations, objectURL])

  return (
    <group renderOrder={1}>
      <mesh ref={playerRef} scale={scale} position={p} rotation={initRotation ? initRotation : new Euler(0, 0, 0)}>
        <primitive object={scene} />
      </mesh>
      {device !== EDeviceType.Unknown && (
        <PlayerControl object={playerRef} grp={grp} resetPosition={initPosition} actions={myActions} mixer={mixer} device={device} />
      )}
    </group>
  )
}
