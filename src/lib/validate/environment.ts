import {ethers} from 'ethers'
import axios from 'axios'
import {getNetworks} from '../constants/constants'
import getWalletKey from '../wallet-key'
import {environment} from '../environment'
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
