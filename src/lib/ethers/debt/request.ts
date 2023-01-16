import {ethers} from 'ethers'
import {
  constructorParams2levels,
  getBorrowerFactoryAddress,
} from '../../constants/constants'
import {animateContractCreationTransaction} from '../common'
import BorrowerDebtTransferFactoryV2 from '../../constants/contracts/factories/BorrowerDebtTransferFactoryV2.json'
import BorrowerDebtTransferFactoryV3 from '../../constants/contracts/factories/BorrowerDebtTransferFactoryV3.json'
import {environment} from '../../environment'
import {validateError} from '../../validate/environment'

export const deployBorrowerContract = async (env: environment) => {
  const BorrowerDebtTransferFactory = env.network.protocols.aave === 'v2' ? BorrowerDebtTransferFactoryV2 : BorrowerDebtTransferFactoryV3
  const factoryContract = new ethers.Contract(getBorrowerFactoryAddress(env), BorrowerDebtTransferFactory.abi, env.network.managedSigner)
  const params = (BorrowerDebtTransferFactory.params as constructorParams2levels)[env.network.slug][env.network.type]
  return animateContractCreationTransaction(
    env,
    factoryContract,
    env.network.protocols.aave === 'v2' ? 'createBorrowerV2Contract' : 'createBorrowerV3Contract',
    params,
  ).catch(validateError)
}
