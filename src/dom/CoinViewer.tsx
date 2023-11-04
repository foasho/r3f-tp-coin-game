import { useCoinStore } from "../utils/store";
import { PiCoinsDuotone } from "react-icons/pi";

export const CoinViewer = () => {

  const { coins } = useCoinStore();

  return (
    <div
      style={{
        position: 'absolute',
        left: '16px',
        top: '32px',
        zIndex: 10,
        userSelect: 'none'
      }}
    >
      <div
        style={{
          backgroundColor: '#00000088',
          color: '#fff',
          borderRadius: '32px',
          padding: '8px 15px',
        }}
      >
        <span
          style={{
            fontSize: '24px',
            color: '#fff',
            marginRight: '8px',
            padding: '0 12px',
            fontWeight: 'bold'
          }}
        >
          {"集めたコイン: "}
        </span>
        <span
          style={{
            fontSize: '32px',
            color: '#fff',
            marginRight: '8px'
          }}
        >
          <PiCoinsDuotone
            style={{
              fontSize: '24px',
              color: '#fff',
              marginRight: '8px'
            }}
          />
          {coins}
        </span>
      </div>
    </div>
  )
};