import {ethers} from 'ethers'
import {
  constructorParams2levels,
  getDelegatorDebtTransferFactoryAddress,
} from '../../../constants/constants'
import {animateContractCreationTransaction} from '../../common'
import DelegatorDebtTransferFactoryV2 from '../../../constants/contracts/factories/DelegatorDebtTransferFactoryV2.json'
import DelegatorDebtTransferFactoryV3 from '../../../constants/contracts/factories/DelegatorDebtTransferFactoryV3.json'
import {environment} from '../../../environment'
import {validateError} from '../../../validate/environment'

export const deployDelegatorDebtTransferContract = async (env: environment) => {
  const DelegatorDebtTransferFactory = env.network.protocols.aave === 'v2' ? DelegatorDebtTransferFactoryV2 : DelegatorDebtTransferFactoryV3
  const factoryContract = new ethers.Contract(getDelegatorDebtTransferFactoryAddress(env), DelegatorDebtTransferFactory.abi, env.network.managedSigner)
  const params = (DelegatorDebtTransferFactory.params as constructorParams2levels)[env.network.slug][env.network.type]
  return animateContractCreationTransaction(
    env,
    factoryContract,
    env.network.protocols.aave === 'v2' ? 'createDelegatorV2Contract' : 'createDelegatorV3Contract',
    params,
  ).catch(validateError)
}
