import {environment} from '../environment'
import {Contract} from '@ethersproject/contracts'
import ora, {Ora} from 'ora'

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
  console.log('Contract deployed')
  return transactionReceipt.logs[0].address
}

export const animateTransaction = async (
  env: environment,
  preComment: string,
  postComment: string,
  contract: Contract,
  functionName: string,
  args: any[],
) => {
  let throbber: Ora
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
  console.log(postComment)
  return transactionReceipt.transactionHash
}

