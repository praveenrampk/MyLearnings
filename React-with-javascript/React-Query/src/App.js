import { useState } from "react";
import { mnemonicToSeed } from "bip39";

const App = () => {
  const [seedPhrase, setSeedPhrase] = useState('');

  const generateSeedPhrase = async (key) => {
    const phrases = await mnemonicToSeed(key);
    setSeedPhrase(phrases.toString('hex'));
  }
  console.log(seedPhrase);
  return (
    <div>
      <p>Seed Phrase: {seedPhrase}</p>
      <button onClick={() => generateSeedPhrase('d4cecb1a4a63739b94aa1b8a70c43f72f6e72a6f9e49c3b3e2dcf153888c70c3')}>seeds</button>
    </div>
  )
}
export default App;
