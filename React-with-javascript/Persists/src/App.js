import Counter from "./Counter";
import { generateMnemonic, mnemonicToSeedSync} from 'bip39';
import { bitcoin } from "bitcoinjs-lib/src/networks";
import { useEffect } from "react";
import {MnemonicPassPhrase} from 'symbol-hd-wallets'


const App =_=> {
  useEffect(() => {
    const checking = () => {
      const mnemonic = MnemonicPassPhrase.createRandom();
      console.log(mnemonic.plain)
    }
    checking();
  }, []);

  return (
    <div>
      {/* <Counter/> */}
    </div>
  )
}
export default App;