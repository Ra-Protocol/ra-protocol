import {environment} from '../environment'
import {Contract} from '@ethersproject/contracts'
import ora from 'ora'

export const exploreContract = (env: environment, address: string) => `${env.network.explorer}/address/${address}`

export const exploreTransaction = (env: environment, hash: string) => `${env.network.explorer}/tx/${hash}`

export const animateContractCreationTransaction = async (
  contract: Contract,
  functionName: string,
  args: any[],
) => {
  const throbber = ora('Deploying contract').start()
  const transaction = await contract[functionName](...args).catch((error: any) => {
    throbber.stop()
    throw error
  })
  const transactionReceipt = await transaction.wait()
  throbber.stop()
  console.log('Contract deployed')
  return transactionReceipt.logs[0].address
}

export const animateTransaction = async (
  preComment: string,
  postComment: string,
  contract: Contract,
  functionName: string,
  args: any[],
) => {
  const throbber = ora(preComment).start()
  const transaction = await contract[functionName](...args).catch((error: any) => {
    throbber.stop()
    throw error
  })
  const transactionReceipt = await transaction.wait()
  throbber.stop()
  console.log(postComment)
  return transactionReceipt.transactionHash
}

