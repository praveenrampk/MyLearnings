# HEX Extension Provider API !

Hex is an extension for accessing **Hedera Hashgraph** from your browser. This extension will also injects the Hedera API’s into every javascript context so that the application can read from the blockchain.

## Enable

**Connecting** or **Logging** into HEX, means you are accessing your **Hedera account**(s). In order to allow a site to access your account. Using this provider should call the following the method.

**SYNTAX**

> **window.hex.enable()**

**Example**

```
<button type="button" onclick="window.hex.enable()">
   Enable HEX
</button>
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        accountId: "0.0.XXXYYY",
        message: "HEX Connected to the Site"
    }
}
```

- **Error :**

```
{
    status: "error",
    message: "HEX Connection Rejected by user"
}
```

```
{
    status: "error",
    message: "Error Connecting HEX"
}
```

## Active Address

To get the active address approved by hex for the requesting host can be done bu the following method.

> **window.hex.getActiveAddress()**

**Example**

```
// Add a listener to "hexProvider".

window.addEventListener("hexProvider", (data) => {
    console.log("detail", data);
});

<button onClick="window.hex.getActiveAddress()">Get Active Address</button>
```

**Responses**

- **Success :**

```
{
    status: "success",
    accountId: "0.0.XXXYYY"
}
```

- **Error :**

```
{
    status: "error",
    message: "Enable HEX for this site"
}
```

# Arbitrary

Now you can use HEX to allow signature request from other origin. This arbitrary allows you add your signature to the transaction and also sign message for you.

**SYNTAX**

> **window.hex.signMessage( { transaction: Transaction } )**

It takes either transaction or message. In case of both it takes only the transaction.

> **window.hex.signMessage( { message: "Sign this message" })**

**Parameters**

- transaction `<Transaction> Uint8Array` : Transaction as bytes[].

- message `<string>` : Message that needed to be signed.

**Example** _For Transaction_

```
const transaction = new TransferTransaction(); // Create a transaction
transaction.setTransactionMemo("Confirm this transaction"); // Do the transaction
await transaction.freezeWith(client); // Freeze it
await transaction.signWithOperator(client); // Create your signature
const signedTx = await transaction.toBytes();

window.hex.signMessage({
    transaction: signedTx
});
```

**Example** _For Signing a message_

```
const message = "Welcome to Hex! Sign this message"
window.hex.signMessage({ message })
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Signed Successfully",
        data: {
            accountId: "0.0.XXXYYY",
            transactionBytes:  Transaction<Uint8Array>,
            transactionReceipt: {
                status: "SUCCESS",
                transactionId: "0.0.YYYZZZ@1624714073.748301485",
            }
        }
    }
}

In case of not submitting to the network, `transactionReceipt` will be false.
```

**Note** : `transactionReceipt` will be `false`, on user rejects to submit the transaction to Hedera network.

# Send Batch

Other than noraml transaction request, now you can make all possible transfers together using this _sendBatch_ api. This allows you to do mulitple transaction on both hbars and the tokens.

**SYNTAX**

> **window.hex.sendBatch( { hbars: { amount, transferTo }, tokens: { tokenId, tokenId, transferTo } } )**

If you want to do mulitple transactions on each, just add the transactions as an array and pass it to the property.

**Parameters**

- hbars `<{ amount, transferTo }[]>` : Array of hbar transaction

- tokens `<{ tokenId, amount, transferTo }[]>` : Array of token transaction

**Example**

```
window.hex.sendBatch({
    hbars:[{
        amount: "20",
        transferTo: 0.0.XXXXXX
    },{
        amount: "100",
        transferTo: 0.0.XXYXYY
    }],
    tokens:[{
        tokenId: "0.0.XXXYYY",
        amount: "20",
        transferTo: 0.0.XXXXXX
    },{
        tokenId: "0.0.XXXXYY",
        amount: "100",
        transferTo: 0.0.XXYXYY
    }]
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Batch Transfer Successfull",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0768.10XX02X99",
            params: {
                hbars: [{
                    transferTo: "0.0.XXXXXX",
                    amount: "20",
                }, {
                    transferTo: "0.0.XXYXYY",
                    amount: "100",
                }],
                tokens: [{
                    tokenId: "0.0.XXXYYY",
                    transferTo: "0.0.XXXXXX",
                    amount: "20",
                }, {
                    tokenId: "0.0.XXXXYY",
                    transferTo: "0.0.XXYXYY",
                    amount: "100",
                }],
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Batch Transfer Failed",
        data: error.message
    }
}
```

## Transfer Hbar

Transaction is a basic action done in a blockchain. To create a transaction that involves transferring Hbar can be done by using the following method.

**SYNTAX**

> **window.hex.sendBatch( {hbars: { amount, transferTo } })**

To perform a mulitple Hbar transaction,

**SYNTAX**

> **window.hex.sendBatch( { hbars: [{ amount, transferTo }, { amount, transferTo }] } )**

**Parameters**

- hbars `<{ amount, transferTo }[]>` : Array of hbar transaction

- amount `<string>` : Amount of Hbar to Send

- transferTo `<string>` : Address of the account which receives the Hbar

**Example**

```
window.hex.sendBatch({
    hbars:[{
        amount: "20",
        transferTo: 0.0.XXXXXX
    },{
        amount: "100",
        transferTo: 0.0.XXYXYY
    }]
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Hbar Transfer Successfull",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                hbars: [{
                    transferTo: "0.0.XXXXXX",
                    amount: "20",
                }, {
                    transferTo: "0.0.XXYXYY",
                    amount: "100",
                }]
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Hbar Transfer Failed",
        data: error.message
    }
}
```

## Swap

Swap allows you to exchange **one cryptocurrency for another** without leaving the blockchain. In HEX you can transfer from **hex, hbar, eth** to **hbar and hex**. To do this the below method is used. The market price will be calculated for each crypto.

**SYNTAX**

> **window.hex.swap({ cryptoFrom, cryptoTo, amount })**

**Parameters**

- cryptoFrom `<string>` : Cryptocurrency that you are selling to buy another `[eth, hex, hbar]`.

- cryptoTo `<string>` : Cryptocurrency that you wanted to receive for what you are selling `[hex, hbar]`.

**Example**

```
window.hex.swap({
    cryptoFrom : "eth" ,
    cryptoTo: "hbar",
    amount: "20"
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Swapping Done Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                address: "0x738D0X0DXX042CX49",
                from: "eth",
                to: "hbar",
                amount: "20",
                accountId: "0.0.6X28XX",
                exchangeAmount: "73X722X",
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Swapping",
        data: error.message
    }
}
```

# Add Token

## Associate Token

If you want to add a token to your wallet this method will allow you to do. You will be able to use a token created by someone you hold or own. Each token will have a unique address. Specifying the address will add directly to your wallet.

**SYNTAX**

> **window.hex.associateToken({ tokenId })**

**Parameters**

- tokenId `<string>` : Valid Address of the token that needs to be added. `(i.e) 0.0.638001 `

**Example**

```
window.hex.associateToken({
  tokenId: "0.0.638001"
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Added Successfully",
        data: {
            status: "SUCCESS",
            data: {
                transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
                params: {
                    tokenId: "0.0.63XX01"
                }
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Associating Token",
        data: error.message
    }
}
```

# Remove Token

## Dissociate Token

The Opposite of **Associate Token**. To remove a unwanted token from your wallet or a nill token. To do so, this method is used. Removing the token if just from the wallet.

**SYNTAX**

> **window.hex.dissociateToken({ tokenId })**

**Parameters**

- tokenId `<string>` : Valid Address of the token which needs to be removed. `(i.e) 0.0.638001 `

**Example**

```
window.hex.dissociateToken({
  tokenId: "0.0.638001"
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Removed Successfully",
        data: {
            status: "SUCCESS",
            data: {
                transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
                params: {
                    tokenId: "0.0.63XX01"
                }
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Dissociating Token",
        data: error.message
    }
}
```

# Create Token

Hex enables you to create both Fungible and Non-Fungible Token. To create these you can follow the below methods to do so. In this the both function takes different inputs.

## Fungible Token

A `fungible token` is a mutable token where you can change or update the properties of the token. It can be minted oor burned based on its specified properties. HEX allows you to add options like enabling kyc for the token.

**Syntax**

> **window.hex.createFungibleToken({ tokenName, tokenSymbol, decimal, initialSupply, options })**

**Parameters**

- **tokenName** `<string>` : Name of your token `Hedera Token`

- **tokenSymbol** `<string>` : Symbol of your token `HToken`

- **decimal** `<string>` : Deciaml for your token

- **initialSupply** `<string>` : Total number of supplies for your token.

* #### **options** :

  - admin `<boolean>` : DEFAULT `true` <br> Enabling Admin for the token. If not enabled the token is preserved as immutable.

  - kyc `<boolean>` : DEFAULT `false` <br> In order to add functions like providing or revoking kyc to the token, the kyc needs to be enabled.``

  - wipe `<boolean>` : DEFAULT `true` <br> This allows you to wipe the token.

  - freeze `<boolean>` : DEFAULT `true` <br> This allows you to freeze the token for a particular account

  - changeSupply `<boolean>` : DEFAULT `true` <br> This allows you to change the total supply later afer the token is created and deployed. By mintig or burning the tokens.

  - defaultFreeze `<boolean>` : DEFAULT `false` <br> This makes the account should be unfrozen before it receive the token.

**Example**

```
window.hex.createFungibleToken({
  tokenName: "HEX Token",
  tokenSymbol: "HTKN",
  decimal: "18",
  initialSupply: "100000",
  {
      admin: true,
      changeSupply: true,
  }
});
```

**Response**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Created Successfully",
        data: {
            status: "SUCCESS",
            tokenId: "0.0.63XX01",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                name: "HEX Token",
                symbol: "HTKN",
                decimal: "18",
                initialSupply: "100000",
                admin: true,
                kyc: false,
                wipe: true,
                freeze: true,
                supply: true,
                defaultFreeze: false,
            }
        }
    }
}
```

## Non Fungible Token

A `Non-Fungible Token` is a immutable token like a rare edition of **NBA cards**. Consider a token that holds the information about the contract who created and who it is assigned to and the documents. Once the contract is created the token will be no longer mutated. To Create a NFT the following method is used.

**Syntax**

> **window.hex.createNonFungibleToken({ tokenName, templateName, properties })**

**Parameters**

- **tokenName** `<string>` : Name of your immutable token `Hedera Token`

- **templateName** `<string>` : Name of the templateto your token.

- **properties** `<array [{name, value}]>` : Array of objects holding the data for each properties.

  - `name` - "contractCreatedBy" property field.

  - `value` - "Jon Doe" value of the property.

**Example**

```
window.hex.createNonFungibleToken({
  tokenName: "CRYPTO KITTIES",
  templateName: "Season 1",
  [
      {
          name: "name",
          value: "Pickachu"
      },
      {
          name: "strength",
          value: "1000"
      }
  ]
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Created Successfully",
        data: {
            status: "SUCCESS",
            tokenId: "0.0.63XX01",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                name: "CRYPTO KITTIES",
                symbol: "hedera://XXXXX",
                decimal: 0,
                initialSupply: 1,
                defaultFreeze: false
            }

        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Creating Token",
        data: error.message
    }
}
```

# Send Token

Transaction is the basic thing in blockchain. Same as this transfering a token to another wallet. To do this, we can follow two methods.

**Method-1**
**Syntax**

- Using the _sendToken_
  > window.hex.sendToken({ transferTo, tokenId, amount });
- for multiple token tranfers
  > window.hex.sendToken([{ transferTo, tokenId, amount }, { transferTo, tokenId, amount }]);

**Method-2**
**Syntax**

- Using the _sendbatch_
  > window.hex.sendBatch( { tokens: { transferTo, tokenId, amount } } );
- for mulitple token transfers
  > window.hex.sendBatch( { tokens: [ { transferTo, tokenId, amount }, { transferTo, tokenId, amount } ] } );

**Parameters**

- **transferTo** `<string>` : Address of the `receipient` wallet.

- **tokenId** `<string>`: Address of the token that you are sending.

- **amount** `<string>`: Number of tokens to be sent / received by the recepient.

**Example: Method-1**

```
window.hex.sendToken([
    {
        transferTo: "0.0.253728",
        tokenId: "0.0.564382",
        amount: "20"
    },
    {
        transferTo: "0.0.253728",
        tokenId: "0.0.564382",
        amount: "10"
    }
]);
```

**Example: Method-2**

```
window.hex.sendBatch({
    tokens: [
        {
            transferTo: "0.0.253728",
            tokenId: "0.0.564382",
            amount: "20"
        },
        {
            transferTo: "0.0.253728",
            tokenId: "0.0.564382",
            amount: "10"
        }
    ]
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Transfer Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: [
                {
                    tokenId: "0.0.564382",
                    amount: "200",
                    transferTo: "0.0.253728",
                },
                {
                    tokenId: "0.0.564282",
                    amount: "100",
                    transferTo: "0.0.253728",
                },
            ]
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Sending Token",
        data: error.message
    }
}
```

# Mint Token

Minting is the process of adding additional supplies of the token. Burning is the process of reducing the total supplies of the token. This will be eligible when the token is created with **changeSupply** flag.

**Syntax**

> window.hex.mintToken({ tokenId, amount });

**Parameters**

- **tokenId** `<string>`: Address of the token that you are minting.

- **amount** `<string>`: Number of tokens to be added to the total supply.

**Example**

```
window.hex.mintToken({
  tokenId: "0.0.564382",
  amount: "200"
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Minted Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: "0.0.564382",
                amount: "200",
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Minting Token",
        data: error.message
    }
}
```

# Burn Token

**Syntax**

> window.hex.burnToken({ tokenId, amount });

**Parameters**

- **tokenId** `<string>`: Address of the token that you are burning.

- **amount** `<string>`: Number of tokens to be removed from the total supply.

**Example**

```
window.hex.burnToken({
  tokenId: "0.0.564382",
  amount: "200"
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Burned Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: "0.0.564382",
                amount: "200",
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Burning Token",
        data: error.message
    }
}
```

# Grant KYC

The tokens can be granted with KYC and also be revoked from KYC for the user holding that token. To do this the following methods are used.

**Syntax**

> window.hex.grantKYC({ accountId, tokenId });

**Parameters**

- **accountId** `<string>`: Address of the account / wallet that is granted for kyc.

- **tokenId** `<string>`: Address of the token that you are granting KYC.

**Example**

```
window.hex.grantKYC({
  accountId: "0.0.526738",
  tokenId: "0.0.564382",
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Granted KYC Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: "0.0.564382",
                account: "0.0.526738",
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Granting KYC for Token",
        data: error.message
    }
}
```

# Revoke KYC

**Syntax**

> window.hex.revokeKYC({ accountId, tokenId });

**Parameters**

- **accountId** `<string>`: Address of the account / wallet that is revoked for kyc.

- **tokenId** `<string>`: Address of the token that you are revoking KYC.

**Example**

```
window.hex.revokeToken({
  accountId: "0.0.526738",
  tokenId: "0.0.564382",
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Revoked KYC Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: "0.0.564382",
                account: "0.0.526738",
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Revoking KYC for Token",
        data: error.message
    }
}
```

# Freeze Token

Tokens can be freezed for a particular account to prevent them from making any transaction which involves the token.

**Syntax**

> window.hex.freezetoken({ accountId, tokenId });

**Parameters**

- **accountId** `<string>`: Address of the account / wallet where the token should be freezed.

- **tokenId** `<string>`: Address of the token that you are freezing in a account.

**Example**

```
window.hex.freezeToken({
  accountId: "0.0.526738",
  tokenId: "0.0.564382",
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Freezed Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: "0.0.526738",
                account: "0.0.564382",
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Freezing Token",
        data: error.message
    }
}
```

# UnFreeze Token

**Syntax**

> window.hex.revokeKYC({ accountId, tokenId });

**Parameters**

- **accountId** `<string>`: Address of the account / wallet where the token should be unfreezed.

- **tokenId** `<string>`: Address of the token that you are unfreezing in a account.

**Example**

```
window.hex.unfreezeToken({
  accountId: "0.0.526738",
  tokenId: "0.0.564382",
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Unfreezed Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: "0.0.526738",
                account: "0.0.564382",
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error UnFreezing Token",
        data: error.message
    }
}
```

# Wipe Token

Tokens can be wiped for a particular amount from an address.

**Syntax**

> window.hex.wipeToken({ accountId, tokenId, amount });

**Parameters**

- **accountId** `<string>`: Address of the account / wallet where the token should be wiped.

- **tokenId** `<string>`: Address of the token that you are wiping in a account.

- **amount** `<string>`: Amount of token needed to be wiped.

**Example**

```
window.hex.wipeToken({
  accountId: "0.0.526738",
  tokenId: "0.0.564382",
  amount: "100"
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Wiped Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: "0.0.564382",
                amount: "100",
                account: "0.0.526738"
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Wiping Token",
        data: error.message
    }
}
```

# Delete Token

Token can be deleted permanently from the blockchain. Only the mutable token can be deleted.

**Syntax**

> window.hex.deleteToken({ tokenId });

**Parameters**

- **tokenId** `<string>`: Address of the token that you are deleting.

**Example**

```
window.hex.deleteToken({
  tokenId: "0.0.564382
});
```

**Responses**

- **Success :**

```
{
    status: "success",
    message: {
        message: "Token Deleted Successfully",
        data: {
            status: "SUCCESS",
            transactionId: "0.0.26X54X@1623XX0668.10XX02X99",
            params: {
                tokenId: ""
            }
        }
    }
}
```

- **Error :**

```
{
    status: "error",
    message: {
        message: "Error Deleting Token",
        data: error.message
    }
}
```

# Error Messages (status)

- `INSUFFICIENT_PAYER_BALANCE` :
  ```
  You don't have enough Hbars. Kindly purchase some at your earliest convenience.
  ```
- `INSUFFICIENT_TOKEN_BALANCE` :
  ```
  You don't have enough tokens.
  ```
- `INVALID_TOKEN_ID` :
  ```
  Invalid Token ID.
  ```
- `INVALID_ACCOUNT_ID` :
  ```
  Invalid Account ID.
  ```
- `TOKEN_NOT_ASSOCIATED_TO_ACCOUNT` :
  ```
  Token is not associated to account.
  ```
- `TokenAlreadyAssociatedToAccount` :
  ```
  Token is already associated to account.
  ```
- `TRANSACTION_REQUIRES_ZERO_TOKEN_BALANCES` :
  ```
  Token Balance must be zero for transaction to go thorugh.
  ```
- `INVALID_SIGNATURE` :
  ```
  Invalid Private Key.
  ```
- `ACCOUNT_DELETED` :
  ```
  Account does not exist.
  ```
- `ACCOUNT_IS_TREASURY` :
  ```
  Account is treasury.
  ```
- `INSUFFICIENT_ACCOUNT_BALANCE` :
  ```
  You don't have enough Hbars. Kindly purchase some at your earliest convenience.
  ```
- `TOKEN_HAS_NO_SUPPLY_KEY` :
  ```
  Token Supply is immutable.
  ```
- `INVALID_TOKEN_BURN_AMOUNT` :
  ```
  Invalid Token Burn Amount.
  ```
- `TOKEN_IS_IMMUTABLE` :
  ```
  Token is immutable.
  ```
- `ACCOUNT_KYC_NOT_GRANTED_FOR_TOKEN` :
  ```
  KYC not granted for Account.
  ```
- `ACCOUNT_REPEATED_IN_ACCOUNT_AMOUNTS` :
  ```
  Accounts repeated in Transaction.
  ```
- `INVALID_ACCOUNT_AMOUNTS` :

  ```
  Invalid amounts.
  ```
