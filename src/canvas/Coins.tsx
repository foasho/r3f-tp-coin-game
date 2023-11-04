import seedrandom from "seedrandom";
import { Euler, Vector3, Group } from "three";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Clone, Text3D, useFont, useGLTF } from "@react-three/drei";
import { useCoinStore, usePlayerStore } from "../utils/store";

export const Coins = ({ num }: { num: number }) => {

  const font = useFont('/MPLUS.json');

  return (
    <Suspense fallback={null}>
      {[...Array(num)].map((_, i) => (
        <RandomCoin key={i} index={i} fieldSize={128} maxHeight={6} />
      ))}
      <Text3D font={font.data} position={[3, 3, 0]} rotation={[0, Math.PI, 0]} scale={0.5}>
        コインを集めよう！
        <meshBasicMaterial color={"red"} />
      </Text3D>
    </Suspense>
  )
}

const RandomCoin = ({ index, fieldSize, maxHeight }: { index: number; fieldSize: number; maxHeight: number; }) => {
  const ref = useRef<Group>(null);
  const { playerRef } = usePlayerStore();
  const { coins, setCoins } = useCoinStore();
  const [visible, setVisible] = useState(true);
  const { scene } = useGLTF('/coin.gltf');
  const seed = 2048273649
  // シードとインデックスを用いた乱数生成器を初期化
  const rng = seedrandom((seed + index).toString());

  // X: -fieldSize/2~fieldSize/2, Y: 0~maxHeight, Z: -fieldSize/2~fieldSize/2の範囲でランダムに配置
  const p = new Vector3(rng() * fieldSize - fieldSize / 2, rng() * maxHeight, rng() * fieldSize - fieldSize / 2)
  const r = new Euler(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI)
  // 1 ~ 3のランダムなSpeed
  const speed = rng() * 2 + 1;

  useFrame(() => {
    // 回転
    if (ref.current) {
      ref.current.rotation.y += 0.01 * speed;
    }
    // 判定
    if (playerRef.current && ref.current){
      const playerPos = playerRef.current.position.clone();
      const distance = playerPos.distanceTo(ref.current.position);
      if (distance < 3. && visible) {
        setVisible(false);
        setCoins(coins + 1);
      }
    }
  });

  return (
    <group 
      ref={ref} 
      position={p}
      rotation={[
        0,
        r.y,
        0
      ]}
    >
      <Clone object={scene} visible={visible} />
    </group>
  )
}