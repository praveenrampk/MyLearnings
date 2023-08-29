export const useOnboardingSyncStorage = () => {
  const getFromSyncStorage = async <T>(key: string | string[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, function (value: T) {
          resolve(typeof key === 'string' ? value[key] : value);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const setSyncStorage = async (data) => {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.sync.set(data, function () {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const getFromLocalStorage = async <T>(key: string | string[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get([key], function (value: T) {
          resolve(typeof key === 'string' ? value[key] : value);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const setLocalStorage = async (data) => {
    return new Promise<void>((resolve, reject) => {
      try {
        chrome.storage.local.set(data, function () {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    getFromSyncStorage,
    setSyncStorage,
    getFromLocalStorage,
    setLocalStorage,
  };
};
