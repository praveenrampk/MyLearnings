import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { get, isEmpty, isNull, isUndefined } from "lodash";

var transport = null;
var publicKey = null;

// const LEDGER_HEDERA_PATH = "44'/3030'/0'/0'/0'";
const INDEX = 0x00; // Key Index on Ledger

const CLA = 0xe0;
const INS_GET_PK = 0x02;
const INS_SIGN_TX = 0x04;

const P1_UNUSED_APDU = 0x00;
const P2_UNUSED_APDU = 0x00;

const OPEN_TIMEOUT = 100000;
const LISTENER_TIMEOUT = 300000;

const createTransport = async () => {
  const webusbSupported = await TransportWebUSB.isSupported();
  if (!webusbSupported) throw new Error("Web USB not supported in browser.");

  if (!isEmpty(transport) && !isNull(transport)) return transport;

  transport = await TransportWebUSB.create(OPEN_TIMEOUT, LISTENER_TIMEOUT);

  return transport;
};

const getPublicKey = async () => {
  if (!isEmpty(publicKey) || !isNull(publicKey)) return publicKey;

  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(INDEX, 0);

  const response = await sendAPDU({
    CLA,
    INS: INS_GET_PK,
    P1: P1_UNUSED_APDU,
    P2: P2_UNUSED_APDU,
    buffer,
  });

  if (isEmpty(response) || isUndefined(response) || isNull(response)) {
    throw new Error("Unexpected Empty Response From Ledger Device");
  }

  publicKey = response.slice(0, -2).toString("hex");
  return publicKey;
};

const sendAPDU = async (message) => {
  if (isEmpty(transport) || isNull(transport) || isUndefined(transport))
    transport = await createTransport();

  const response = await transport.send(
    get(message, "CLA", ""),
    get(message, "INS", ""),
    get(message, "P1", ""),
    get(message, "P2", ""),
    get(message, "buffer", "")
  );

  return response;
};

const signTransaction = async (txnData) => {
  const dataBuffer = Buffer.from(txnData);
  const buffer = Buffer.alloc(4 + dataBuffer.length);

  buffer.writeUInt32LE(INDEX, 0);
  buffer.fill(dataBuffer, 4);

  const response = await sendAPDU({
    CLA,
    INS: INS_SIGN_TX,
    P1: P1_UNUSED_APDU,
    P2: P2_UNUSED_APDU,
    buffer,
  });

  if (isEmpty(response) || isUndefined(response) || isNull(response)) {
    throw new Error("Unexpected Empty Response From Ledger Device");
  }

  return new Uint8Array(response.slice(0, -2));
};

export { transport, createTransport, getPublicKey, sendAPDU, signTransaction };
