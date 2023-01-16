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
