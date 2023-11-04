import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Player } from './Player'
import { Field } from './Field'
import { Group } from 'three'
import { Coins } from './Coins'

export const BVHWalk = () => {
  const { raycaster } = useThree();
  // @ts-ignore
  raycaster.firstHitOnly = true;
  const grp = useRef<Group>(null);

  return (
    <>
      <Player grp={grp} objectURL={'/fox.gltf'} />
      <Field grp={grp} />
      <Coins num={30} />
    </>
  )
}
