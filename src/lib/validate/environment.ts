import {ethers} from 'ethers'
import axios from 'axios'
import {coins, getNetworks, tokens} from '../constants/constants'
import getWalletKey from '../wallet-key'
import {environment, getDecimalsByTokenAddress} from '../environment'
import chalk from 'chalk'

const processApiError = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data)
  } else {
    if (error.request.res?.statusCode) {
      throw new Error(`API returned exception: ${error.request.res.statusCode} ${error.request.res.statusMessage}`)
    }

    throw new Error('Failed communicating with the server. Check your internet connection')
  }
}

const bold = (text: string) => '\u001B[1m' + text + '\u001B[0m'

export const validateCliVersion = async (env: environment): Promise<void> => {
  const url = new URL(env.invisibleFlags['api-url'] + '/cli')
  url.search = new URLSearchParams({
    raApiKey: env.globalFlags['ra-key'],
  }).toString()

  const response = await axios.get(url.href).catch(processApiError) as any

  const [major, minor, patch] = env.invisibleFlags.version.split('.')
  const minVersion = response.data
  const [minMajor, minMinor, minPatch] = minVersion.split('.')
  if (
    minMajor > major ||
    (minMajor === major && minMinor > minor) ||
    (minMajor === major && minMinor === minor && minPatch > patch)
  ) throw new Error(`minimal CLI version requirement: ${minVersion}\nPlease upgrade your cli with ${bold('npm i -g ra-protocol')}`)
}

export const validateWalletKey = async (key?: string): Promise <void> => {
  const walletKey = key || await getWalletKey()
  if (!ethers.utils.isHexString(walletKey, 32) && !ethers.utils.isHexString('0x' + walletKey, 32)) {
    throw new Error('invalid wallet private key')
  }
}

export const validateError = (error: any) => {
  const explanation: {[key: string]: string} = {
    'execution reverted: Ownable: caller is not the owner': 'Contract was deployed using different wallet. Change back your wallet private key or redeploy',
    'execution reverted: SafeERC20: low-level call failed': 'Missing arbitrage opportunity on selected assets',
  }

  if (error.reason === 'missing response' && error.url === 'http://localhost:24012/rpc') {
    throw new Error(`Truffle Dashboard is not running.\nInstall with ${bold('npm install -g truffle')}\nRun with ${bold('truffle dashboard')}\nRead manual at https://trufflesuite.com/blog/introducing-truffle-dashboard`)
  }

  if (error.reason === 'user rejected transaction' || error.error?.message === 'Message rejected by user') {
    throw new Error('You declined transaction')
  }

  if (Object.keys(explanation).includes(error?.error?.error?.error?.message)) {
    throw new Error(explanation[error?.error?.error?.error?.message])
  }

  if (error?.error?.error?.error?.message) {
    throw new Error(error?.error?.error?.error?.message)
  }

  throw error
}

export const validateChainSupported = (env: environment) => {
  const networks = getNetworks(env)
  if (!Object.keys(networks).includes(env.network.slug) || !Object.keys(networks[env.network.slug]).includes(env.network.type)) {
    throw new Error(`network ${env.network.slug} ${env.network.type} is not supported`)
  }

  if (env.network.slug === 'ethereum' && !env.globalFlags['infura-key']) {
    throw new Error('Working with ethereum network requires setting infura key. For details run\n' +
      chalk.bold('ra-protocol config set --help'))
  }
}

export const validateCollateral = (env: environment): [string, number] => {
  let collateral = env.flags.collateral
  if (Object.keys(coins).includes(collateral)) {
    if (coins[collateral].includes(env.network.slug)) {
      collateral = 'W' + collateral
      env.network.useWrapper = true
    } else {
      throw new Error(`${collateral} is not supported on ${env.network.slug}`)
    }
  }

  if (!Object.keys(tokens[env.network.slug][env.network.type][env.network.protocols.aave]).includes(collateral) && !ethers.utils.isAddress(collateral)) {
    const supportedTokens = Object.keys(tokens[env.network.slug][env.network.type][env.network.protocols.aave]).join(', ')
    throw new Error(`${collateral} is not on the list of known tokens (${supportedTokens}) for ${env.network.slug} ${env.network.type}`)
  }

  const token = tokens[env.network.slug][env.network.type][env.network.protocols.aave][collateral]
  return [token, getDecimalsByTokenAddress(env, token)]
}

export const validateAsset = (env: environment): [string, number] => {
  const asset = env.flags.asset
  if (!Object.keys(tokens[env.network.slug][env.network.type][env.network.protocols.aave]).includes(asset) && !ethers.utils.isAddress(asset)) {
    const supportedTokens = Object.keys(tokens[env.network.slug][env.network.type][env.network.protocols.aave]).join(', ')
    throw new Error(`${asset} is not on the list of known tokens (${supportedTokens}) for ${env.network.slug} ${env.network.type}`)
  }

  const token = tokens[env.network.slug][env.network.type][env.network.protocols.aave][asset]
  return [token, getDecimalsByTokenAddress(env, token)]
}

export const validateAmount = (env: environment, decimals: number) => {
  if (Number.isNaN(env.flags.amount)) {
    throw new TypeError('amount must be a number')
  }

  return ethers.utils.parseUnits(env.flags.amount, decimals).toString()
}
