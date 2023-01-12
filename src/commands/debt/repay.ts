import {BaseCommand} from '../../baseCommand'
import getWalletKey from '../../lib/wallet-key'
import {asset, chain, mainnet, redeploy, amount} from '../../flags'
import axios from 'axios'
import {Flags} from '@oclif/core'

export default class DebtRepay extends BaseCommand<any> {
  static description = 'Easiest, quickest option to get a flash loan up and running'

  static examples = [
    `$ ra-protocol debt repay --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
{
  approve: {
    transactionHash: '0xe7c52a366800ae944590d7ca9072ddef9059902955b05bcce51ed22105550f9c',
    explore: 'https://goerli.arbiscan.io/tx/0xe7c52a366800ae944590d7ca9072ddef9059902955b05bcce51ed22105550f9c'
  },
  repay: {
    transactionHash: '0x67cf9436aef20919d2a434c4476f65c36208d4f6fc54effb3ecf8b7767f1c47b',
    explore: 'https://goerli.arbiscan.io/tx/0x67cf9436aef20919d2a434c4476f65c36208d4f6fc54effb3ecf8b7767f1c47b'
  }
}
Loan repayment is complete
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
    const {flags} = await this.parse(DebtRepay)
    const walletKey = await getWalletKey()
    const params: {
      [key: string]: any,
    } = {
      cli: this.config.version,
      raApiKey: this.globalFlags['ra-key'],
      walletKey: walletKey,
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      asset: flags.asset,
      amount: flags.amount,
      lender: flags.lender,
    }

    if (flags.mainnet) {
      await this.risksConsent()
      params.mainnet = true
    }

    if (flags.redeploy) {
      params.redeploy = true
    }

    const url = new URL(this.invisibleFlags['api-url'] + '/debt/repay')
    url.search = new URLSearchParams(params as keyof unknown).toString()

    const response = await axios.get(url.href).catch(this.processApiError) as any
    if (this.gotError) return

    if (response) {
      this.log(response.data)
    }

    if (!this.gotError) {
      this.log('Loan repayment is complete')
    }
  }
}
