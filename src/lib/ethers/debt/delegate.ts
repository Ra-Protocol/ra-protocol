import {BigNumber, ethers} from 'ethers'
import {
  constructorParams3levels,
  getDelegatorFactoryAddress,
  tokens,
} from '../../constants/constants'
import {animateContractCreationTransaction, animateTransaction} from '../common'
import {environment} from '../../environment'
import {validateError} from '../../validate/environment'
import DelegatorFactory from '../../constants/contracts/factories/DelegatorFactory.json'

export const deployDelegatorContract = async (env: environment) => {
  const factoryContract = new ethers.Contract(getDelegatorFactoryAddress(env), DelegatorFactory.abi, env.network.managedSigner)
  const params = (DelegatorFactory.params as constructorParams3levels)[env.network.slug][env.network.type][env.network.protocols.aave]
  return animateContractCreationTransaction(
    env,
    factoryContract,
    env.network.protocols.aave === 'v2' ? 'createDelegatorV2Contract' : 'createDelegatorV3Contract',
    params,
  ).catch(validateError)
}

export const depositCoinAsCollateral = async (env: environment, amount: string) => {
  return animateTransaction(
    env,
    env.contracts.delegateContract,
    'depositCoinAsCollateral',
    [{
      value: amount,
    }],
  ).catch(validateError)
}

export const depositCollateral = async (env: environment) => {
  const networkTokens = tokens[env.network.slug][env.network.type][env.network.protocols.aave]

  return animateTransaction(
    env,
    env.contracts.delegateContract,
    'depositCollateral',
    [
      networkTokens[env.flags.collateral],
      env.flags.amount,
    ],
  ).catch(validateError)
}

export const approveBorrower = async (
  env: environment,
  borrowContractAddress: string,
  borrowToken: string,
  availableToBorrow: BigNumber,
) => {
  return animateTransaction(
    env,
    env.contracts.delegateContract,
    'approveBorrower',
    [
      borrowContractAddress,
      borrowToken,
      availableToBorrow,
    ],
  ).catch(validateError)
}
