import {BaseCommand} from '../../baseCommand'
import {asset, chain, mainnet, redeploy, amount} from '../../flags'
import {Flags} from '@oclif/core'
import {buildEnvironment, environment} from '../../lib/environment'
import {ethers} from 'ethers'
import DelegatorV2 from '../../lib/constants/contracts/AaveV2UniV2/DelegatorV2.json'
import DelegatorV3 from '../../lib/constants/contracts/AaveV3UniV2/DelegatorV3.json'
import BorrowerDebtTransferV2 from '../../lib/constants/contracts/AaveV2UniV2/BorrowerDebtTransferV2.json'
import BorrowerDebtTransferV3 from '../../lib/constants/contracts/AaveV3UniV2/BorrowerDebtTransferV3.json'
import {validateAmount, validateAsset} from '../../lib/validate/environment'
import {callFlashLoan} from '../../lib/ethers/debt/borrow'

export default class DebtBorrow extends BaseCommand<any> {
  static description = 'Perform approved loan from a user'

  static examples = [
    `$ ra-protocol debt borrow --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
http://localhost:3000/api/debt/borrow?cli=0.12.1&raApiKey=ce10be268b2c006f1483012e97b68d8b&chain=arbitrum&protocol-aave=v3&lender=dmitry.matora%40gmail.com
Approved for borrowing: 3.2 DAI
Called flashloan at https://goerli.arbiscan.io/tx/0x8c1a93d9ad5865e5e1d9d6091b29481cabe364457bd3731104d44d58e63d2878
`,
  ]

  static flags = {
    chain,
    mainnet,
    redeploy,
    lender: Flags.string({
      description: 'email of lender',
      required: true,
    }),
    asset,
    amount,
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    const {flags} = await this.parse(DebtBorrow)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const [borrowToken, borrowTokenDecimals] = validateAsset(env)
    const amount = validateAmount(env, borrowTokenDecimals)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      lender: flags.lender,
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const checkResponse = await this.callApi('/debt/borrow', params)
    const {borrowContractAddress, delegateContractAddress} = checkResponse.data

    env.contracts.delegateContract = new ethers.Contract(delegateContractAddress, env.network.protocols.aave === 'v2' ? DelegatorV2 : DelegatorV3, env.network.managedSigner)
    env.contracts.borrowContract = new ethers.Contract(borrowContractAddress, env.network.protocols.aave === 'v2' ? BorrowerDebtTransferV2 : BorrowerDebtTransferV3, env.network.managedSigner)

    const tokenBorrowAllowance = await env.contracts.borrowContract.getTokenBorrowAllowance(
      borrowToken,
      delegateContractAddress,
      borrowContractAddress,
      1,
    )
    if (tokenBorrowAllowance.lt(ethers.BigNumber.from(amount))) {
      throw new Error(`Requested amount ${ethers.utils.formatUnits(amount, borrowTokenDecimals)} exceeds allowed ${ethers.utils.formatUnits(tokenBorrowAllowance, borrowTokenDecimals)}`)
    }

    this.log(`Approved for borrowing: ${ethers.utils.formatUnits(tokenBorrowAllowance, borrowTokenDecimals)} ${flags.asset}`)

    await callFlashLoan(env, borrowToken, delegateContractAddress, amount)
  }
}
