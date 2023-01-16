import {ethers} from 'ethers'
import {animateTransaction} from '../common'
import {environment} from '../../environment'
import {validateError} from '../../validate/environment'
import DelegatorV2 from '../../constants/contracts/AaveV2UniV2/DelegatorV2.json'
import DelegatorV3 from '../../constants/contracts/AaveV3UniV2/DelegatorV3.json'

export const repayDelegator = async (
  env: environment,
  borrowToken: string,
  amount: string,
  delegateContractAddress: string,
) => {
  const delegateContract = new ethers.Contract(delegateContractAddress, env.network.protocols.aave === 'v2' ? DelegatorV2 : DelegatorV3, env.network.managedSigner)
  return animateTransaction(
    env,
    delegateContract,
    'repayDelegator',
    [
      borrowToken,
      amount,
      delegateContractAddress,
      1,
    ],
  ).catch(validateError)
}
