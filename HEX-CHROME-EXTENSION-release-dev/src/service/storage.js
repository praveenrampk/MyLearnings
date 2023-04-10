/* global chrome */

export const getDataFromChromeSyncStorage = async (key) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function(value) {
        resolve(value);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const getDataFromChromeLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, function(value) {
        resolve(value);
      });
    } catch (err) {
      reject(err);
    }
  });
};
