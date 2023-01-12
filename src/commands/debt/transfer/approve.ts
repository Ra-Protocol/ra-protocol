import {BaseCommand} from '../../../baseCommand'
import getWalletKey from '../../../lib/wallet-key'
import {asset, chain, mainnet, redeploy, amount, collateral} from '../../../flags'
import axios from 'axios'
import {Flags} from '@oclif/core'

export default class DebtTransferApprove extends BaseCommand<any> {
  static description = 'Approve debt transfer request (allow user to repay your loan with condition of delegating your borrowing power)'

  static examples = [
    `$ ra-protocol debt transfer approve --chain arbitrum --recipient recipient@gmail.com --collateral ETH --asset DAI --amount 0.001
{
  depositCoinAsCollateral: {
    transactionHash: '0x09fd138e91c2dfb00eaf7bc7fb47276c5d7d4211a740d7b716d32ce575824e1f',
    explore: 'https://goerli.arbiscan.io/tx/0x09fd138e91c2dfb00eaf7bc7fb47276c5d7d4211a740d7b716d32ce575824e1f'
  },
  approveBorrower: {
    transactionHash: '0x310245e87ac2764968df4ae18fdb609fe9bb7100a379e416dac38d8cfa3924fa',
    explore: 'https://goerli.arbiscan.io/tx/0x310245e87ac2764968df4ae18fdb609fe9bb7100a379e416dac38d8cfa3924fa'
  }
}
debt transfer is approved
`,
  ]

  static flags = {
    chain,
    mainnet,
    redeploy,
    recipient: Flags.string({
      description: 'email of debt recipient',
      required: true,
    }),
    collateral,
    asset,
    amount,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(DebtTransferApprove)
    const walletKey = await getWalletKey()
    const params: {
      [key: string]: any,
    } = {
      cli: this.config.version,
      raApiKey: this.globalFlags['ra-key'],
      walletKey: walletKey,
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      collateral: flags.collateral,
      asset: flags.asset,
      amount: flags.amount,
      recipient: flags.recipient,
    }

    if (flags.mainnet) {
      await this.risksConsent()
      params.mainnet = true
    }

    const url = new URL(this.invisibleFlags['api-url'] + '/debt/transfer/approve')
    url.search = new URLSearchParams(params as keyof unknown).toString()

    const response = await axios.get(url.href).catch(this.processApiError) as any
    if (this.gotError) return

    if (response) {
      this.log(response.data)
    }

    if (!this.gotError) {
      this.log('debt transfer is approved')
    }
  }
}
