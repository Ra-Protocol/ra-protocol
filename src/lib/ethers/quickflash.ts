import {ethers} from 'ethers'
import {
  constructorParams3levels,
  getArbFactoryAddress,
  tokens,
} from '../constants/constants'
import {animateContractCreationTransaction, animateTransaction} from './common'
import ArbFactory from '../constants/contracts/factories/ArbFactory.json'
import {environment} from '../environment'
import {validateError} from '../validate/environment'

export const deployArbitrageContract = async (env: environment) => {
  const factoryContract = new ethers.Contract(getArbFactoryAddress(env), ArbFactory.abi, env.network.managedSigner)
  const params = (ArbFactory.params as constructorParams3levels)[env.network.slug][env.network.type][env.network.protocols.aave]
  return animateContractCreationTransaction(
    env,
    factoryContract,
    env.network.protocols.aave === 'v2' ? 'createArbV2Contract' : 'createArbV3Contract',
    params,
  ).catch(validateError)
}

export const maybeCallSetTokenAddresses = async (env: environment) => {
  const [asset1, asset2] = env.flags.asset
  const networkTokens = tokens[env.network.slug][env.network.type][env.network.protocols.aave]
  const tokenToArbitrageAddress = await env.contracts.loanContract.tokenToArbitrageAddress()
  const tokenToSwapToAddress = await env.contracts.loanContract.tokenToSwapToAddress()
  const tokensMatch = tokenToArbitrageAddress === networkTokens[asset1] && tokenToSwapToAddress === networkTokens[asset2]
  if (tokensMatch) {
    console.log('Skipping setTokenAddresses (assets match contract)')
    return
  }

  return animateTransaction(
    env,
    env.contracts.loanContract,
    'setTokenAddresses',
    [
      networkTokens[asset1],
      networkTokens[asset2],
    ],
  ).catch(validateError)
}

export const callFlashLoan = async (env: environment) => {
  return animateTransaction(
    env,
    env.contracts.loanContract,
    'flashloan',
    [env.flags.amount],
  ).catch(validateError)
}
