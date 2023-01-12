import {NonceManager} from '@ethersproject/experimental'
import {Provider} from '@ethersproject/providers'
import {ethers} from 'ethers'
import {
  validateChainSupported,
  validateCliVersion,
  validateWalletKey,
} from './validate/environment'
import getWalletKey from './wallet-key'
import {getNetworks} from './constants/constants'
import {Contract} from '@ethersproject/contracts/lib'

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
    provider: Provider,
    managedSigner: NonceManager,
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
  } as any
  const networks = getNetworks(env)
  env.network.type = env.flags.mainnet ? 'mainnet' : 'testnet'
  if (env.network.type === 'mainnet') throw new Error('mainnet operations are currently disabled for security upgrades')
  env.network.slug = env.flags.chain
  validateChainSupported(env)
  env.network = {
    ...env.network,
    ...networks[env.network.slug][env.network.type],
  }
}

const buildAccount = async (env: environment) => {
  env.network.account = {} as any
  env.network.account.address = await env.network.managedSigner.getAddress()
  env.network.account.balance = await env.network.provider.getBalance(env.network.account.address)
  console.log(`Using wallet ${env.network.account.address} on network ${env.network.slug} ${env.network.type}`)
}

const buildSigner = async (env: environment) => {
  await validateWalletKey()
  env.network.provider = ethers.getDefaultProvider(env.network.rpc)
  const walletKey = await getWalletKey()
  const signer = new ethers.Wallet(walletKey as string, env.network.provider)
  env.network.managedSigner = new NonceManager(signer)
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
) => {
  env.flags = flags
  env.globalFlags = globalFlags
  env.invisibleFlags = invisibleFlags
  env.contracts = {}
  await validateCliVersion(env)
  buildNetwork(env)
  await buildSigner(env)
  buildProtocols(env)
  await buildAccount(env)
  validateBalance(env)
}
