const hex = {};
/**
 * Triggers a Send Hbar confirmation prompt from HEX extension
 *
 * @example
 * sendHbar(10, "0.0.231332")
 *
 * // triggers send hbar extension prompt
 * @returns {function} callback
 *
 * @param {number} amount - amount of hbar to send
 * @param {string} transferTo- account id to send the hbar to
 */

hex.sendHbar = ({ amount, transferTo }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "hbar-transfer",
      amount,
      transferTo,
    },
    "*"
  );
};

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
 * associateToken("0.0.231332")
 *
 * // triggers associate token extension prompt
 * @returns {function} callback
 *
 * @param {number} tokenId - token id to associate with the account
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
 * dissociateToken("0.0.231332")
 *
 * // triggers dissociate token extension prompt
 * @returns {function} callback
 *
 * @param {number} tokenId - token id to dissociate with the account
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

hex.sendToken = ({ transferTo, tokenId, amount }) => {
  window.postMessage(
    {
      to: "HEX",
      trigger: true,
      type: "token-send",
      transferTo,
      tokenId,
      amount,
    },
    "*"
  );
};

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

window.onload = function () {
  window.hex = hex;
};
