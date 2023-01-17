import {NonceManager} from '@ethersproject/experimental'
import {Provider} from '@ethersproject/providers'
import {ethers} from 'ethers'
import {
  validateChainSupported,
  validateCliVersion, validateError,
  validateWalletKey,
} from './validate/environment'
import getWalletKey from './wallet-key'
import {decimals, getNetworks, tokens} from './constants/constants'
import {Contract} from '@ethersproject/contracts/lib'
import {JsonRpcProvider, JsonRpcSigner} from '@ethersproject/providers'
import chalk from 'chalk'

export type environment = {
  requiresNoGas: boolean,
  flags: any,
  contracts: {[key: string]: Contract},
  globalFlags: any,
  invisibleFlags: any,
  network: {
    type: string,
    slug: string,
    rpc: string,
    explorer: string,
    networkId: number,
    provider: Provider | JsonRpcProvider,
    managedSigner: NonceManager | JsonRpcSigner,
    useDashboard: boolean
    useWrapper: boolean
    account: {
      address: string
      balance: ethers.BigNumber
    },
    protocols: {
      aave: string,
    }
  },
}

const buildNetwork = (env: environment) => {
  env.network = {
    useWrapper: false,
    useDashboard: false,
  } as any
  const networks = getNetworks(env)
  env.network.useDashboard = env.globalFlags.dashboard === 'on'
  env.network.type = env.flags.mainnet ? 'mainnet' : 'testnet'
  env.network.slug = env.flags.chain
  validateChainSupported(env)
  env.network = {
    ...env.network,
    ...networks[env.network.slug][env.network.type],
  }
}

const buildAccount = async (env: environment) => {
  env.network.account = {} as any
  env.network.account.address = await env.network.managedSigner.getAddress().catch(validateError)
  env.network.account.balance = await env.network.provider.getBalance(env.network.account.address)
  console.log(`Using wallet ${env.network.account.address} on network ${env.network.slug} ${env.network.type}`)
}

const buildSigner = async (env: environment) => {
  if (env.network.useDashboard) {
    env.network.provider = new ethers.providers.JsonRpcProvider('http://localhost:24012/rpc')
    env.network.managedSigner = (env.network.provider as JsonRpcProvider).getSigner()
    const {chainId} = await env.network.provider.getNetwork()
    if (chainId !== env.network.networkId) {
      throw new Error(`Truffle Dashboard reports you forgot to switch your wallet to ${chalk.bold(env.network.slug)} ${chalk.bold(env.network.type)}`)
    }
  } else {
    await validateWalletKey()
    env.network.provider = ethers.getDefaultProvider(env.network.rpc)
    const walletKey = await getWalletKey()
    const signer = new ethers.Wallet(walletKey as string, env.network.provider)
    env.network.managedSigner = new NonceManager(signer)
  }
}

const buildProtocols = (env: environment) => {
  env.network.protocols = {} as any
  env.network.protocols.aave = env.globalFlags['protocol-aave']
}

const validateBalance = (env: environment) => {
  if (!env.requiresNoGas && env.network.account.balance.toString() === '0') {
    throw new Error('Your wallet balance is 0')
  }
}

export const buildEnvironment = async (
  env: environment,
  flags: any,
  globalFlags: any,
  invisibleFlags: any,
  readOnly = false,
) => {
  env.flags = flags
  env.globalFlags = globalFlags
  env.invisibleFlags = invisibleFlags
  env.contracts = {}
  await validateCliVersion(env)
  buildNetwork(env)
  await buildSigner(env)
  buildProtocols(env)
  if (!readOnly) {
    await buildAccount(env)
    validateBalance(env)
  }
}

export const getTokenName = (
  env: environment,
  tokenAddress: string,
) => {
  const networkTokens = tokens[env.network.slug][env.network.type][env.network.protocols.aave]
  return Object.keys(networkTokens).find(key => networkTokens[key] === tokenAddress) as string
}

export const getDecimalsByTokenAddress = (
  env: environment,
  tokenAddress: string,
) => {
  const tokenName = getTokenName(env, tokenAddress)
  return decimals(tokenName)
}

