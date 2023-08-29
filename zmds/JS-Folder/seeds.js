import bip39 from 'bip39';
import { bip32 } from 'bitcoinjs-lib';

// Generate a BIP39 mnemonic
const mnemonic = bip39.generateMnemonic();

// Derive the master extended key from the mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);
const masterKey = bip32.fromSeed(seed);

// Derive a child key from the master key
const path = "m/0'/0'/0'"; // the derivation path for the child key
const childKey = masterKey.derivePath(path);

console.log("mnemonic:", mnemonic);
console.log("master extended key:", masterKey.toBase58());
console.log("child key:", childKey.toBase58());
