import {
  PrivateKey,
  FileContentsQuery,
  FileCreateTransaction,
  FileUpdateTransaction,
  FileAppendTransaction,
  FileId,
} from "@hashgraph/sdk";
import { Blob, NFTStorage } from "nft.storage";
import { getAccDetails, setStateAlertData } from "../store";
import hederaClient from "../service/hederaClient";
import { getErrorMessage, nftStorageApiKey } from "../utils/helpers";
import { gateways } from "../utils/constants";

export const fileGetContents = async ({ fileId }) => {
  try {
    const { accountId, privateKey, network, walletType } = getAccDetails();

    const client = await hederaClient({
      accountId,
      privateKey,
      network,
      walletType,
    });

    const info = await new FileContentsQuery()
      .setFileId(FileId.fromString(fileId))
      .execute(client);

    return info;
  } catch (err) {
    console.log("Error in get file contents", err);
    setStateAlertData({
      title: "Token Details",
      type: "error",
      message: getErrorMessage(err.message),
    });
  }
};

export const getFileFromIpfs = async (cid) => {
  try {
    const data = await Promise.any(gateways.map(async gateway => {
      const response = await fetch(`${gateway}/ipfs/${cid}`);
      return response.json();
    }));
    return data;
  } catch (error) {
    console.log("Error in get file contents", error);
    setStateAlertData({
      title: "Token Details",
      type: "error",
      message: getErrorMessage(error.message),
    });    
  }
};

export const fileCreate = async ({
  client,
  privateKey,
  fileData,
  setProgressPercent,
  storageType
}) => {
  try {
    if (storageType === "hedera") {
      const fileChunk = 4000;
      const totalSize = fileData.length;
      const largeFile = totalSize > fileChunk;

      const sigKey = PrivateKey.fromString(privateKey);

      let startIndex = 0;

      const fileCreateTransaction = new FileCreateTransaction();

      if (largeFile) {
        // if we have a large file (> 4000 bytes), create the file with keys
        // then run file append
        // then remove keys
        fileCreateTransaction.setContents(fileData.slice(0, fileChunk));
        fileCreateTransaction.setKeys([sigKey]);
      } else {
        fileCreateTransaction.setContents(fileData);
      }

      const progressPercent = Math.min((fileChunk / totalSize) * 100, 100);
      setProgressPercent(progressPercent);

      let response = await fileCreateTransaction.execute(client);
      let transactionReceipt = await response.getReceipt(client);

      const fileId = transactionReceipt.fileId.toString();

      startIndex = startIndex + fileChunk;

      while (startIndex <= totalSize) {
        await new Promise((r) => setTimeout(r, 500));
        response = await new FileAppendTransaction()
          .setContents(fileData.slice(startIndex, startIndex + fileChunk))
          .setFileId(FileId.fromString(fileId))
          .execute(client);
        const progressPercent = Math.min((startIndex / totalSize) * 100, 100);
        setProgressPercent(progressPercent);
        await response.getReceipt(client);
        startIndex = startIndex + fileChunk;
      }

      if (largeFile) {
        response = await new FileUpdateTransaction()
          .setKeys([])
          .setFileId(FileId.fromString(fileId))
          .execute(client);
        setProgressPercent(100);
        transactionReceipt = await response.getReceipt(client);
      }

      return fileId;
    }
    else {
      const nftStorageClient = new NFTStorage({ token: nftStorageApiKey });
      const content = new Blob([fileData], { type: "application/json" });
      return await nftStorageClient.storeBlob(content);
    }
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
