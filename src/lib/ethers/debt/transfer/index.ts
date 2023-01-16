import {animateTransaction} from '../../common'
import {environment} from '../../../environment'
import {validateError} from '../../../validate/environment'

export const flashloanAndRepay = async (
  env: environment,
  borrowToken: string,
  amount: string,
  borrowContractAddress: string,
  delegateContractAddress: string,
) => {
  return animateTransaction(
    env,
    env.contracts.transferContract,
    'flashloanAndRepay',
    [
      borrowToken,
      amount,
      1,
      borrowContractAddress,
      delegateContractAddress,
      1,
    ],
  ).catch(validateError)
}
