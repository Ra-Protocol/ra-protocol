import {animateTransaction} from '../common'
import {environment} from '../../environment'
import {validateError} from '../../validate/environment'

export const callFlashLoan = async (env: environment, borrowToken: string, delegateContractAddress: string, amount: string) => {
  return animateTransaction(
    env,
    env.contracts.borrowContract,
    'flashloan',
    [
      borrowToken,
      amount,
      delegateContractAddress,
      1,
    ],
  ).catch(validateError)
}

