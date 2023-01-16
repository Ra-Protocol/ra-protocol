import {environment, getTokenName} from '../environment'
import {Contract} from '@ethersproject/contracts'
import ora, {Ora} from 'ora'
import {BigNumber, ethers} from 'ethers'
import {validateAsset, validateError} from '../validate/environment'
import ERC20 from '../constants/contracts/ERC20.json'
import {tokens} from '../constants/constants'
import {valueToBigNumber} from '../bignumber'

export const exploreContract = (env: environment, address: string) => `${env.network.explorer}/address/${address}`

export const exploreTransaction = (env: environment, hash: string) => `${env.network.explorer}/tx/${hash}`

export const animateContractCreationTransaction = async (
  env: environment,
  contract: Contract,
  functionName: string,
  args: any[],
) => {
  let throbber: Ora
  throbber = env.network.useDashboard ? ora('Waiting for transaction approval in Truffle Dashboard').start() : ora('Deploying contract').start()

  const transaction = await contract[functionName](...args).catch((error: any) => {
    throbber.stop()
    throw error
  })
  if (env.network.useDashboard) {
    throbber.stop()
    throbber = ora('Deploying contract').start()
  }

  const transactionReceipt = await transaction.wait()
  throbber.stop()
  const contractAddress = transactionReceipt.logs[0].address
  console.log(`Contract deployed at ${exploreContract(env, contractAddress)}`)
  return contractAddress
}

export const animateTransaction = async (
  env: environment,
  contract: Contract,
  functionName: string,
  args: any[],
  customPreComment: string | null = null,
  customPostComment: string | null = null,
) => {
  let throbber: Ora
  const preComment = customPreComment || `Calling ${functionName}`
  throbber = env.network.useDashboard ? ora('Waiting for transaction approval in Truffle Dashboard').start() : ora(preComment).start()

  const transaction = await contract[functionName](...args).catch((error: any) => {
    throbber.stop()
    throw error
  })
  if (env.network.useDashboard) {
    throbber.stop()
    throbber = ora(preComment).start()
  }

  const transactionReceipt = await transaction.wait()
  throbber.stop()
  const postComment = customPostComment || `Called ${functionName} at ${exploreTransaction(env, transactionReceipt.transactionHash)}`
  console.log(postComment)
  return transactionReceipt.transactionHash
}

export const approveERC20 = async (
  env: environment,
  erc20Token: string,
  spender: string,
  amount: string,
) => {
  const tokenName = getTokenName(env, erc20Token)
  return animateTransaction(
    env,
    new ethers.Contract(erc20Token, ERC20, env.network.managedSigner),
    'approve',
    [
      spender,
      amount,
    ],
    `Calling ERC20 approve for ${tokenName}`,
    `Got ERC20 approval for ${tokenName} transfer`,
  ).catch(validateError)
}

export const depositCoinAsCollateral = async (env: environment, contract: Contract, amount: string) => {
  return animateTransaction(
    env,
    contract,
    'depositCoinAsCollateral',
    [{
      value: amount,
    }],
  ).catch(validateError)
}

export const depositCollateral = async (env: environment, contract: Contract, amount: string) => {
  const networkTokens = tokens[env.network.slug][env.network.type][env.network.protocols.aave]
  return animateTransaction(
    env,
    contract,
    'depositCollateral',
    [
      networkTokens[env.flags.collateral],
      amount,
    ],
  ).catch(validateError)
}

export const approveBorrower = async (
  env: environment,
  contract: Contract,
  borrowerAddress: string,
  borrowToken: string,
  availableToBorrow: BigNumber,
) => {
  return animateTransaction(
    env,
    contract,
    'approveBorrower',
    [
      borrowerAddress,
      borrowToken,
      availableToBorrow,
    ],
  ).catch(validateError)
}

export const getBorrowingLimit = async (env: environment, contract: Contract, borrowerAddress: string) => {
  const [borrowToken, borrowTokenDecimals] = validateAsset(env)
  const userAccountData = await contract.getUserAccountData(borrowerAddress)
  const assetPrice = await contract.getAssetPrice(borrowToken)
  return ethers.utils.parseUnits(valueToBigNumber(userAccountData.availableBorrowsETH.toString()).div(assetPrice.toString()).toFixed(borrowTokenDecimals), borrowTokenDecimals)
}
