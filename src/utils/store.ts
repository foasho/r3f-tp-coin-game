import { create } from "zustand";

type CoinStoreProps = {
  coins: number;
  setCoins: (coins: number) => void;
  increment: () => void;
  decrement: () => void;
};
export const useCoinStore = create<CoinStoreProps>()(set => ({
  coins: 0,
  setCoins: (coins: number) => set(() => ({ coins })),
  increment: () => set(state => ({ coins: state.coins + 1 })),
  decrement: () => set(state => ({ coins: state.coins - 1 }))
}));

type PlayerStoreProps = {
  playerRef: React.RefObject<THREE.Object3D>;
  setPlayerRef: (ref: React.RefObject<THREE.Object3D>) => void;
};
export const usePlayerStore = create<PlayerStoreProps>()(set => ({
  playerRef: { current: null },
  setPlayerRef: (ref: React.RefObject<THREE.Object3D>) =>
    set(() => ({ playerRef: ref }))
}));