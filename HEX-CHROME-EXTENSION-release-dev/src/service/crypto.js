/* global chrome */

const defaultVersion = 1;
const nIterations = {
  WEAK: 50000,
  MEDIUM: 1000000,
  STRONG: 5000000,
};

const getVersionBuffer = () => {
  const paddedVersion = defaultVersion.toString().padStart(12, "0");
  const versionBuffer = new ArrayBuffer(paddedVersion.length);

  return versionBuffer;
};

export const generateRandomValues = (byteLength) =>
  window.crypto.getRandomValues(new Uint8Array(byteLength));

const bufferToHex = (buffer) => {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
};

const convertEncryptedResultToHex = (encryptedValue) => {
  const returnObject = {};
  Object.entries(encryptedValue).forEach(([key, value]) => {
    if (["salt", "nonce", "encryptedObject"].includes(key)) {
      returnObject[key] = bufferToHex(value);
    } else {
      returnObject[key] = value;
    }
  });
  return returnObject;
};

const hexStringToUint8Array = (hexStr) => {
  const regexp = /^[0-9a-fA-F]+$/;

  // Validate the object is hex by checking that length is even and the entire string is within the Hexidecimal range.
  if (!(hexStr.length % 2 === 0 && regexp.test(hexStr))) {
    throw new Error(`The provided value is not hexidecimal:${hexStr}`);
  }

  const arrayBuffer = new Uint8Array(hexStr.length / 2);
  for (var i = 0; i < hexStr.length; i += 2) {
    var byteValue = parseInt(hexStr.substr(i, 2), 16);
    arrayBuffer[i / 2] = byteValue;
  }
  return arrayBuffer;
};

const arrayBufferToString = (uint8Array) =>
  String.fromCharCode.apply(null, Array.from(new Uint8Array(uint8Array)));

const deriveBitsFromRawKey = async (rawKey, salt, iterations) =>
  await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    rawKey,
    256
  );

const createPasskey = async (passphrase) => {
  const bufferPhrase = new TextEncoder().encode(passphrase);
  return await window.crypto.subtle.importKey(
    "raw",
    bufferPhrase,
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
};

const deriveMasterKey = async (passphrase, salt, iterations) => {
  const rawKey = await createPasskey(passphrase);
  const masterKeyBits = await deriveBitsFromRawKey(rawKey, salt, iterations);

  return await window.crypto.subtle.importKey(
    "raw",
    masterKeyBits,
    {
      name: "HKDF",
      hash: "SHA-256",
    },
    false,
    ["deriveBits", "deriveKey"]
  );
};

const deriveAESKeyFromMasterKey = async (masterKey, nonce) => {
  const hkdfSalt = Uint8Array.from(
    atob("wJW4IFKeBayDZpNJTmMyb1nkGWX4LXdZ3XOJwz3reAY="),
    (c) => c.charCodeAt(0)
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "HKDF",
      salt: hkdfSalt,
      info: nonce,
      hash: "SHA-256",
    },
    masterKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

export const lock = async ({
  passphrase,
  secretKey,
  accountId,
  network,
  alias,
  walletType,
}) => {
  const salt = generateRandomValues(32);
  const nonce = generateRandomValues(32);
  const iterations = nIterations.STRONG;

  // Derive a master key.
  const masterKey = await deriveMasterKey(passphrase, salt, iterations);
  const aesKey = await deriveAESKeyFromMasterKey(masterKey, nonce);
  const bufferMessage = new TextEncoder().encode(secretKey);

  // Use crypto subtle with the iv and a AES-GCM cipher for encryption.
  const encryptedObject = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: getVersionBuffer(),
    },
    aesKey,
    bufferMessage
  );

  const encrypted = convertEncryptedResultToHex({
    encryptedObject,
    salt,
    nonce,
    iterations,
    accountId,
    network,
    alias,
    walletType,
  });

  const encryptedString = JSON.stringify(encrypted);

  chrome.storage.sync.set({ [accountId]: encryptedString }, function () {});
};

export const unlock = async ({ passphrase, encrypted }) => {
  const salt = hexStringToUint8Array(encrypted.salt);
  const nonce = hexStringToUint8Array(encrypted.nonce);
  const iterations = encrypted.iterations;
  const encryptedMessage = hexStringToUint8Array(encrypted.encryptedObject);

  const masterKey = await deriveMasterKey(passphrase, salt, iterations);
  const aesKey = await deriveAESKeyFromMasterKey(masterKey, nonce);

  const result = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: getVersionBuffer(),
    },
    aesKey,
    encryptedMessage
  );

  return arrayBufferToString(result);
};
