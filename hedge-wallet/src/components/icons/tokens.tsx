import { useEffect, useState } from 'react';

import {
  BinanceUSD,
  Cardano,
  Ethereum,
  Hedge,
  Receive,
  Send,
  Solana,
} from '@src/assets/img';

const Tokens = ({ name }: { name: string }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    switch (name) {
      case 'binance-usd':
        setIcon(BinanceUSD);
        break;
      case 'ethereum':
        setIcon(Ethereum);
        break;
      case 'solana':
        setIcon(Solana);
        break;
      case 'cardano':
        setIcon(Cardano);
        break;
      case 'send':
        setIcon(Send);
        break;
      case 'receive':
        setIcon(Receive);
        break;
      case 'hedge':
        setIcon(Hedge);
        break;
      default:
        return null;
    }
  }, []);

  return <img src={icon} />;
};

export default Tokens;
