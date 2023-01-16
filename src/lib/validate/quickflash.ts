import {environment} from '../environment'
import {tokens} from '../constants/constants'
import {ethers} from 'ethers'

export const validateAssets = (env: environment) => {
  if (env.flags.masset.length !== 2) {
    return 'two assets are required'
  }

  for (const asset of env.flags.masset) {
    if (!Object.keys(tokens[env.network.slug][env.network.type][env.network.protocols.aave]).includes(asset) && !ethers.utils.isAddress(asset)) {
      const supportedTokens = Object.keys(tokens[env.network.slug][env.network.type][env.network.protocols.aave]).join(', ')
      return `${asset} is not on the list of known tokens (${supportedTokens}) for ${env.network.slug} ${env.network.type}`
    }
  }
}

export const validateAmount = (env: environment) => {
  if (Number.isNaN(env.flags.amount)) {
    throw new TypeError('amount must be a number')
  }
}

export const validateChainSupported = (env: environment) => {
  if (!['ethereum', 'avalanche'].includes(env.network.slug)) {
    throw new Error(`${env.network.slug} is currently not supported for quickflash`)
  }
}
