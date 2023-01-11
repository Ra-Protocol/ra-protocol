import {BaseCommand} from '../../baseCommand'
import getWalletKey from '../../lib/wallet-key'
import {asset, chain, mainnet, redeploy, amount} from '../../flags'
import axios from 'axios'
import {Flags} from '@oclif/core'

export default class DebtBorrow extends BaseCommand<any> {
  static description = 'Perform approved loan from a user'

  static examples = [
    `$ ra-protocol debt borrow --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
{
  flashloan: {
    transactionHash: '0x11bc565368abbeec55df446eebe43e663419efc8cca7d15766f221c01cb6927a',
    explore: 'https://goerli.arbiscan.io/tx/0x11bc565368abbeec55df446eebe43e663419efc8cca7d15766f221c01cb6927a'
  },
  withdraw: {
    transactionHash: '0x3ae261ef80bdb8ff496136e8ff18229177461b615631db3f6b3f9ba7dcedb2a1',
    explore: 'https://goerli.arbiscan.io/tx/0x3ae261ef80bdb8ff496136e8ff18229177461b615631db3f6b3f9ba7dcedb2a1'
  }
}
Flashloan is complete
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
    const {flags} = await this.parse(DebtBorrow)
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

    const url = new URL(this.apiUrl + '/debt/borrow')
    url.search = new URLSearchParams(params as keyof unknown).toString()

    const response = await axios.get(url.href).catch(this.processApiError) as any
    if (this.gotError) return

    if (response) {
      this.log(response.data)
    }

    if (!this.gotError) {
      this.log('Flashloan is complete')
    }
  }
}
