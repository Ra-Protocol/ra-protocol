import {BigNumber} from 'bignumber.js'

export type BigNumberValue = string | number | BigNumber;

export function valueToBigNumber(amount: BigNumberValue): BigNumber {
  if (amount instanceof BigNumber) {
    return amount
  }

  return new BigNumber(amount)
}
