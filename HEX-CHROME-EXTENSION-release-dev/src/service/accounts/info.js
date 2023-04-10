/* global chrome */
import { get } from 'lodash'

import { tokenAssociateLocal } from '../token'
import { getDataFromChromeSyncStorage } from '../storage'
import {
  setStateAccountDetails,
  setStateAlertData,
  getAccDetails,
} from '../../store'
import {
  postData,
  getErrorMessage,
  getKeysByNetwork,
} from '../../utils/helpers'
import {
  defaultQueryParams,
  hexAssociateFee,
  mirrorNodeType,
  tokenTypes,
} from '../../utils/constants'
import { backendRoutes } from '../../utils/routes'
import { getPrices } from '../prices'

export const reloadAccountInfo = async () => {
  try {
    const {
      accountId,
      privateKey,
      network,
      walletType,
      alias,
    } = getAccDetails()

    await getAccountInfo({
      accountId,
      privateKey,
      network,
      alias,
      walletType,
    })
  } catch (err) {
    console.log('Error in reloadAccountInfo', err)
    setStateAlertData({
      title: 'Reload',
      type: 'error',
      message: getErrorMessage(err.message),
    })
  }
}

export const getAccountInfo = async ({
  accountId,
  privateKey,
  network,
  alias,
  walletType = 'software',
}) => {

  const tokenData = []

  const { hexTokenId, usdcTokenId, superUserId } = getKeysByNetwork({
    network,
  })

  const { balance, balanceInUSD } = await getHbarBalance({
    accountId,
    network,
  })

  const { data } = await postData(backendRoutes.mirrorNodeData, {
    url: `/hts/v1/accounts/${accountId}/balances`,
    network,
    mirrorNodeType: mirrorNodeType[1],
  })

  // Get details of Tokens associated with the Account
  for (const t of get(data, 'tokenBalance', [])) {
    const { data } = await postData(backendRoutes.mirrorNodeData, {
      url: `api/v1/tokens/${get(t, 'tokenId', '')}`,
      network,
      mirrorNodeType: mirrorNodeType[0],
    })
    let tBalance = parseInt(get(t, 'balance', 0))
    let supply = parseInt(get(data[0], 'supply', 0))

    if (get(data[0], 'type', '') === tokenTypes[0].type) {
      const padWith = parseInt(get(data[0], 'decimals', 0)) + 1
      tBalance = tBalance / parseInt('1'.padEnd(padWith, '0'))
      supply = supply / parseInt('1'.padEnd(padWith, '0'))
    }

    tokenData.push({
      ...data[0],
      balance: tBalance,
      supply,
      id: get(t, 'tokenId', ''),
    })
  }

  // Check Associated Tokens list if HEX is not associated and do ITO
  const associatedTokenIds = tokenData.map((t) => t.id)

  if (
    !associatedTokenIds.includes(hexTokenId) &&
    accountId !== superUserId &&
    walletType !== 'hardware' &&
    balance > hexAssociateFee
  ) {
    await tokenAssociateLocal({
      accountId,
      tokenId: hexTokenId,
      privateKey: privateKey.toString(),
      network,
      walletType,
    })

    const response = await postData(backendRoutes.tokenITO, {
      network,
      transferTo: accountId,
    })

    if (get(response, 'code', 200) !== 200) {
      throw new Error(get(response, 'message', ''))
    }

    const { data } = await postData(backendRoutes.mirrorNodeData, {
      url: `api/v1/tokens/${hexTokenId}`,
      network,
      mirrorNodeType: mirrorNodeType[0],
    })

    let tBalance = parseInt(get(response, 'data.balance', 0))
    let supply = parseInt(get(data[0], 'supply', 0))

    if (get(data[0], 'decimals', 0)) {
      const padWith = parseInt(get(data[0], 'decimals', 0)) + 1
      tBalance = tBalance / parseInt('1'.padEnd(padWith, '0'))
      supply = supply / parseInt('1'.padEnd(padWith, '0'))
    }

    tokenData.push({
      ...data[0],
      balance: tBalance,
      supply,
      id: hexTokenId,
    })
  }

  //Associating USDC
  if (
    !associatedTokenIds.includes(usdcTokenId) &&
    accountId !== superUserId &&
    walletType !== 'hardware'
  ) {

    const { data } = await postData(backendRoutes.mirrorNodeData, {
      url: `api/v1/tokens/${usdcTokenId}`,
      network,
      mirrorNodeType: mirrorNodeType[0],
    })

    tokenData.push({
      ...data[0],
      id: usdcTokenId,
      balance:0,
      flag: true
    })
  }

  // Get Transaction Data for the account
  const { data: transactionData } = await postData(
    backendRoutes.mirrorNodeData,
    {
      url: `/hedera/api/accounts/${accountId}/transactions?`,
      network,
      params: defaultQueryParams,
      mirrorNodeType: mirrorNodeType[1],
    },
  )

  // Get Hidden Tokens list from Sync storage
  const syncData = await getDataFromChromeSyncStorage(null)
  const hiddenTokens = get(JSON.parse(syncData[accountId]), 'hiddenTokens', [])

  // Store Account Details in chrome storage
  const accountDetails = {
    balance,
    tokenData,
    accountId,
    privateKey,
    network,
    transactionData,
    hiddenTokens,
    alias,
    walletType,
    balanceInUSD,
  }
  const accountDetailsString = JSON.stringify(accountDetails)

  chrome.storage.local.set(
    { accountDetails: accountDetailsString },
    function () {},
  )
  setStateAccountDetails(accountDetails)

  return true
}

export const getHbarBalance = async ({ accountId, network }) => {
  const { transactionHistoryHost } = getKeysByNetwork({
    network,
  })

  let response = await fetch(
    `${transactionHistoryHost}/api/accounts/${accountId}/balance`,
  )
  response = await response.json()
  const prices = await getPrices()

  const balance = get(response, 'balance', 0)
  const balanceInUSD = parseFloat(balance * get(prices, 'hbar.usd', 1))

  return {
    balance,
    balanceInUSD,
  }
}

export const updateHbarBalance = async () => {
  const accountDetails = getAccDetails()

  const { balance, balanceInUSD } = await getHbarBalance({
    accountId: get(accountDetails, 'accountId', ''),
    network: get(accountDetails, 'network', ''),
  })

  const updatedData = {
    ...accountDetails,
    balance,
    balanceInUSD,
  }

  setStateAccountDetails(updatedData)
  chrome.storage.local.set(
    { accountDetails: JSON.stringify(updatedData) },
    function () {},
  )
}

export const updateTokenDetails = async ({ tokenId, isRemove }) => {
  const accountDetails = getAccDetails()
  let tokenData = get(accountDetails, 'tokenData', []).filter(
    (t) => get(t, 'id', '') !== tokenId,
  )

  const { balance, balanceInUSD } = await getHbarBalance({
    accountId: get(accountDetails, 'accountId', ''),
    network: get(accountDetails, 'network', ''),
  })

  if (!isRemove) {
    const { data } = await postData(backendRoutes.mirrorNodeData, {
      url: `/hts/v1/accounts/${get(accountDetails, 'accountId', '')}/balances`,
      network: get(accountDetails, 'network', ''),
      mirrorNodeType: mirrorNodeType[1],
    })
    const updatedTokenBalance = get(data, 'tokenBalance', []).find(
      (t) => get(t, 'tokenId', '') === tokenId,
    )
    const { data: updatedTokenDetails } = await postData(
      backendRoutes.mirrorNodeData,
      {
        url: `api/v1/tokens/${tokenId}`,
        network: get(accountDetails, 'network', ''),
        mirrorNodeType: mirrorNodeType[0],
      },
    )

    let tBalance = parseInt(get(updatedTokenBalance, 'balance', 0))
    let supply = parseInt(get(updatedTokenDetails[0], 'supply', 0))

    if (get(updatedTokenDetails[0], 'decimals', 0)) {
      const padWith = parseInt(get(updatedTokenDetails[0], 'decimals', 0)) + 1
      tBalance = tBalance / parseInt('1'.padEnd(padWith, '0'))
      supply = supply / parseInt('1'.padEnd(padWith, '0'))
    }

    tokenData = [
      ...tokenData,
      {
        ...updatedTokenDetails[0],
        balance: tBalance,
        supply,
      },
    ]
  }

  const updatedData = {
    ...accountDetails,
    tokenData,
    balance,
    balanceInUSD,
  }

  setStateAccountDetails(updatedData)
  chrome.storage.local.set(
    { accountDetails: JSON.stringify(updatedData) },
    function () {},
  )
}

export const updateHostDetails = async (accDetails, updatedHost) => {
  chrome.storage.local.set(
    {
      accountDetails: JSON.stringify({
        ...accDetails,
        approvedHosts: updatedHost,
      }),
    },
    function () {},
  )
}

export const updateHostDetailsInSync = async (accountDetails, hosts) => {
  chrome.storage.sync.set(
    {
      [accountDetails.accountId]: JSON.stringify({
        ...accountDetails,
        approvedHosts: hosts,
      }),
    },
    function () {},
  )
}
