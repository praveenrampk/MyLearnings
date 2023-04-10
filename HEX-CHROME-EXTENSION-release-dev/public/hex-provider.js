const hex = {};
hex.activeAddress = null;
hex.chainId = null;
const hexSubscribers = () => {
  const subscribers = {};

  const publish = (eventName, data) => {
    if (!Array.isArray(subscribers[eventName])) return;
    subscribers[eventName].forEach((callback) => {
      callback(data);
    });
  };

  const subscribe = (eventName, callback) => {
    if (!Array.isArray(subscribers[eventName])) subscribers[eventName] = [];
    subscribers[eventName].push(callback);
  };
  return { publish, subscribe };
};
hex.subscribes = hexSubscribers();
hex.subscribe = hex.subscribes.subscribe;

window.addEventListener("hexProvider", (event) => {
  switch (event.detail.message.type) {
    case "onAccount":
      hex.subscribes.publish("onAccount", {
        id: event.detail.message.accountId,
        network: event.detail.message.network,
      });
      hex.activeAddress = event.detail.message.accountId;
      hex.chainId = event.detail.message.network;
      break;
    case "onTransaction":
      hex.subscribes.publish("onTransaction", event.detail.message);
      break;
    case "onCancel":
      hex.subscribes.publish("onCancel", event.detail.message);
      break;
    case "fileResponse":
      hex.subscribes.publish("onFileData", event.detail.message.fileData);
      break;
    default:
  }
});

/**
 * Triggers a Send Batch confirmation prompt for HEX extension
 *
 *
 * @example
 * sendBatch({hbars: [{amount: "10", transferTo: "0.0.XXXYYY"}], tokens: [{tokenId: "0.0.YYYCDDD",amount: "1", transferTo: "0.0.XXXYYY" }]})
 * @returns {function}                         callback
 *
 * @param {Object} Batch                     - A batch of tokens and hbars.
 *
 * @param {Object[]} Batch.hbars
 * @param {string} Batch.hbars[].transferTo  - Receiver account id for the hbar.
 * @param {string} Batch.hbars[].amount      - Amount of hbar to send.
 *
 * @param {Object[]} Batch.tokens
 * @param {string} Batch.tokens[].tokenId    - Id of the token to be sent.
 * @param {string} Batch.tokens[].transferTo - Receiver account Id for the {{token}}.
 * @param {string} Batch.tokens[].amount     - Amount of {{token}} to send.
 *
 */

hex.sendBatch = ({ hbars, tokens }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "send-batch",
      hbars,
      tokens,
    },
    "*"
  );
};

/**
 * Triggers the swaping confirmation prompt for HEX extension
 *
 * @example
 * swap({cryptoFrom: "eth", cryptoTo: "hbar", amount: "20"})
 * @returns {function}               callback
 * @param {Object} Swap            - Properties for swaping
 * @param {string} Swap.cryptoFrom - crypto you are swaping from
 * @param {string} Swap.cryptoTo   - crypto you are swaping to
 * @param {string} Swap.amount     - amount of crypto you are swaping
 *
 */

hex.swap = ({ cryptoFrom, cryptoTo, amount }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "hbar-swap",
      cryptoFrom,
      cryptoTo,
      amount,
    },
    "*"
  );
};

/**
 * Triggers a Token Associate confirmation prompt from HEX extension
 *
 * @example
 * associateToken({tokenId: "0.0.231332"})
 *
 * // triggers associate token extension prompt
 * @returns {function} callback
 *
 * @param {Object} Token
 * @param {string} Token.tokenId - token id to associate with the account
 *
 */
hex.associateToken = ({ tokenId }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-associate",
      tokenId,
    },
    "*"
  );
};

/**
 * Triggers a Token Dissociate confirmation prompt from HEX extension
 *
 * @example
 * dissociateToken({tokenId: "0.0.231332"})
 *
 * // triggers dissociate token extension prompt
 * @returns {function}             callback
 *
 * @param {Object} Token
 * @param {string} Token.tokenId - token id to dissociate with the account
 *
 */
hex.dissociateToken = ({ tokenId }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-dissociate",
      tokenId,
    },
    "*"
  );
};

/**
 * Triggers a Create Fungible Token confirmation prompt from HEX extension
 *
 * @example
 * createFungibleToken({tokenName: "Hedera", tokenSymbol: "HEDERA", decimal: "8",initialSupply: "1000", { wipe: false }})
 *
 * // triggers create fungible token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Token                               - Params for Fungible Token
 * @param {string}  Token.tokenName                     - Name of the token.
 * @param {string}  Token.tokenSymbol                   - Symbol of the token.
 * @param {string}  Token.decimal                       - Decimal of the token.
 * @param {string}  Token.initialSupply                 - Initial supply of the token.
 * @param {Object}  Token.options                       - Options for the token.
 * @param {boolean} [Token.options.admin=true]          - enable admin.
 * @param {boolean} [Token.options.kyc=false]           - enable kyc.
 * @param {boolean} [Token.options.wipe=true]           - enable wipe.
 * @param {boolean} [Token.options.freeze=true]         - enable freeze.
 * @param {boolean} [Token.options.changeSupply=true]   - enable change supply.
 * @param {boolean} [Token.options.defaultFreeze=false] - enable default freeze.
 */

hex.createFungibleToken = ({
  tokenName,
  tokenSymbol,
  decimal,
  initialSupply,
  options = {
    admin: true,
    kyc: false,
    wipe: true,
    freeze: true,
    changeSupply: true,
    defaultFreeze: false,
  },
}) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-create",
      tokenType: "ft",
      tokenName,
      tokenSymbol,
      decimal,
      initialSupply,
      options,
    },
    "*"
  );
};

/**
 * Triggers a Create Non-Fungible Token confirmation prompt from HEX extension
 *
 * @example
 * createNonFungibleToken({tokenName: "Hedera", templateName: "HEDERA", properties:})
 *
 * // triggers create non fungible token extension prompt
 * @returns {function} callback
 *
 * @param {Object}    Token                       - Params for Non-Fungible Token
 * @param {string}    Token.tokenName             - Name of the token.
 * @param {string}    Token.templateName          - Symbol of the token.
 * @param {Object[]}  Token.properties            - Properties of the NFT.
 * @param {string}    Token.properties[].name     - name of the property
 * @param {string}    Token.properties[].value    - value of the property
 */

hex.createNonFungibleToken = ({ tokenName, templateName, properties }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-create",
      tokenType: "nft",
      tokenName,
      templateName,
      properties,
    },
    "*"
  );
};

/**
 * Triggers a Send Token confirmation prompt from HEX extension
 *
 * @example
 * sendToken([{tokenId: "0.0.XXXYYY",amount: "10", transferTo: "0.0.XXXXYY" }])
 *
 * // triggers send token extension prompt
 * @returns {function} callback
 *
 * @param {Object[]}  transfers                 - Params to send Token
 * @param {string}    transfers[].tokenId       - Id of the token.
 * @param {string}    transfers[].amount        - Amount of the token.
 * @param {string}    transfers[].transferTo    - Receiver id to send the {{token}}
 */

hex.sendToken = (transfers) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-send",
      transfers,
    },
    "*"
  );
};

/**
 * Triggers a Grant KYC confirmation prompt from HEX extension
 *
 * @example
 * grantKYC({ accountId: "0.0.XXXXYY", tokenId: "0.0.XXXYYY" })
 *
 * // triggers grant kyc token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params             - Params for Grant KYC for the Token
 * @param {string}  Params.accountId   - Account Id to grant KYC.
 * @param {string}  Params.tokenId     - Id of the token to be grant.
 *
 */

hex.grantKYC = ({ accountId, tokenId }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-grantkyc",
      accountId,
      tokenId,
    },
    "*"
  );
};

/**
 * Triggers a Revoke KYC confirmation prompt from HEX extension
 *
 * @example
 * revokeKYC({ accountId: "0.0.XXXXYY", tokenId: "0.0.XXXYYY" })
 *
 * // triggers revoke kyc token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params             - Params to Revoke KYC for the Token
 * @param {string}  Params.accountId   - Account Id to revoke KYC.
 * @param {string}  Params.tokenId     - Id of the token to be revoked.
 *
 */

hex.revokeKYC = ({ accountId, tokenId }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-revokekyc",
      accountId,
      tokenId,
    },
    "*"
  );
};

/**
 * Triggers a Freeze Token confirmation prompt from HEX extension
 *
 * @example
 * freezeToken({ accountId: "0.0.XXXXYY", tokenId: "0.0.XXXYYY" })
 *
 * // triggers freeze token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params             - Params for Freeze Token
 * @param {string}  Params.accountId   - Account Id to freeze specified token.
 * @param {string}  Params.tokenId     - Id of the token to be freezed.
 *
 */

hex.freezeToken = ({ accountId, tokenId }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-freeze",
      accountId,
      tokenId,
    },
    "*"
  );
};

/**
 * Triggers a unFreeze Token confirmation prompt from HEX extension
 *
 * @example
 * unFreezeToken({ accountId: "0.0.XXXXYY", tokenId: "0.0.XXXYYY" })
 *
 * // triggers unfreeze token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params             - Params for UnFreeze Token
 * @param {string}  Params.accountId   - Account Id to unfreeze specified token.
 * @param {string}  Params.tokenId     - Id of the token to be unfreezed.
 *
 */

hex.unFreezeToken = ({ accountId, tokenId }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-unfreeze",
      accountId,
      tokenId,
    },
    "*"
  );
};

/**
 * Triggers a Mint Token confirmation prompt from HEX extension
 *
 * @example
 * mintToken({ accountId: "0.0.XXXXYY", tokenId: "0.0.XXXYYY" })
 *
 * // triggers mint token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params            - Params to Mint Token
 * @param {string}  Params.tokenId    - Id of the token to be minted.
 * @param {string}  Params.amount     - Amount of the token to be minted.
 */

hex.mintToken = ({ tokenId, amount }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-mint",
      tokenId,
      amount,
    },
    "*"
  );
};

/**
 * Triggers a Burn Token confirmation prompt from HEX extension
 *
 * @example
 * burnToken({ accountId: "0.0.XXXXYY", tokenId: "0.0.XXXYYY" })
 *
 * // triggers burn token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params            - Params to Burn Token
 * @param {string}  Params.tokenId    - Id of the token to be burned.
 * @param {string}  Params.amount     - Amount of the token to be burned.
 */

hex.burnToken = ({ tokenId, amount }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-burn",
      tokenId,
      amount,
    },
    "*"
  );
};

/**
 * Triggers a Wipe Token confirmation prompt from HEX extension
 *
 * @example
 * wipeToken({ accountId: "0.0.XXXXYY", tokenId: "0.0.XXXYYY" })
 *
 * // triggers wipe token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params            - Params to Wipe Token
 * @param {string}  Params.tokenId    - Id of the token to be wiped.
 * @param {string}  Params.accountId  - Id of the account to be wiped.
 * @param {string}  Params.amount     - Amount of the token to be wiped.
 */

hex.wipeToken = ({ tokenId, accountId, amount }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-wipe",
      tokenId,
      accountId,
      amount,
    },
    "*"
  );
};

/**
 * Triggers a Delete Token confirmation prompt from HEX extension
 *
 * @example
 * deleteToken({ tokenId: "0.0.XXXYYY" })
 *
 * // triggers delete token extension prompt
 * @returns {function} callback
 *
 * @param {Object}  Params            - Params to Delete Token
 * @param {string}  Params.tokenId    - Id of the token to be deleted.
 */

hex.deleteToken = ({ tokenId }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-delete",
      tokenId,
    },
    "*"
  );
};

/**
 * Triggers a Enable confirmation prompt from HEX extension
 *
 * @example
 * enable()
 *
 * // triggers enable extension prompt
 * @returns {function} callback
 *
 */

hex.enable = () => {
  const domain = window.location.hostname;
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "enable-hex",
      domain,
    },
    "*"
  );
};

hex.signMessage = ({ transaction, message }) => {
  const origin = window.location.hostname;
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "sign-hex",
      origin,
      transaction,
      message,
    },
    "*"
  );
};

hex.getNFTFile = ({ fileId }) => {
  const origin = window.location.hostname;
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "sign-hex",
      origin,
      for: "file",
      fileId,
    },
    "*"
  );
};

hex.getActiveAddress = () => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "hex-address",
    },
    "*"
  );
};

window.hex = hex;
