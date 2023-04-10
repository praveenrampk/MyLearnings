const { mnemonicToSeed} = require('bip39');

const PRIVATE_KEY = 'd4cecb1a4a63739b94aa1b8a70c43f72f6e72a6f9e49c3b3e2dcf153888c70c3';
const generateSeedPhrase = async (key) => {
    const seedPhrase = await mnemonicToSeed(key);
    console.log(seedPhrase);
};
generateSeedPhrase(PRIVATE_KEY);