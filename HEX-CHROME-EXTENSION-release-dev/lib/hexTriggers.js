let hex = {};

/**
 * Triggers a Hbar transfer confirmation prompt from HEX extension
 *
 * @example
 * triggerHbarTransfer(10, "0.0.231332")
 *
 * // triggers hbar transfer extension prompt
 * @returns {function} callback
 *
 * @param {number} amount - amount of hbar to transfer
 * @param {string} transferTo- account id to send the hbar to
 */
const triggerHbarTransfer = (amount, transferTo) => {
  console.log("hbar transfer");
  window.postMessage(
    {
      to: "HEX",
      type: "hbar-transfer",
      amount,
      transferTo,
    },
    "*"
  );
};

/**
 * Triggers a Token Associate confirmation prompt from HEX extension
 *
 * @example
 * triggerTokenAssociate("0.0.231332")
 *
 * // triggers associate token extension prompt
 * @returns {function} callback
 *
 * @param {number} tokenId - token id to associate with the account
 */
const triggerTokenAssociate = (tokenId) => {
  console.log("token associate");
  window.postMessage(
    {
      to: "HEX",
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
 * triggerTokenDissociate("0.0.231332")
 *
 * // triggers dissociate token extension prompt
 * @returns {function} callback
 *
 * @param {number} tokenId - token id to dissociate with the account
 */
const triggerTokenDissociate = (tokenId) => {
  console.log("token dissociate");
  window.postMessage(
    {
      to: "HEX",
      type: "token-dissociate",
      tokenId,
    },
    "*"
  );
};

hex = {
  triggerHbarTransfer,
  triggerTokenAssociate,
  triggerTokenDissociate,
};

window.onload = function() {
  window.hex = hex;
};
