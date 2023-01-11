import {BaseCommand} from '../../../baseCommand'
import getWalletKey from '../../../lib/wallet-key'
import {asset, chain, mainnet, redeploy, amount} from '../../../flags'
import axios from 'axios'
import {Flags} from '@oclif/core'

export default class DebtTransfer extends BaseCommand<any> {
  static description = 'Perform approved debt transfer from another user'

  static examples = [
    `$ ra-protocol debt transfer --chain arbitrum --loan 0xE0F70c5BB5a2f37983312aF9314D47175028f36c --asset DAI --amount 1
{
  flashloanAndRepay: {
    transactionHash: '0xd6a71e07ed46a3049c69f57f352132fb62d3623371c405e1ad2c20a1ccd7ba6d',
    explore: 'https://goerli.arbiscan.io/tx/0xd6a71e07ed46a3049c69f57f352132fb62d3623371c405e1ad2c20a1ccd7ba6d'
  },
  withdraw: {
    transactionHash: '0x8737e7535cab16cd426dd05c922190f75a2e9d9b3ac36ed0b63a247b4cfbe8c2',
    explore: 'https://goerli.arbiscan.io/tx/0x8737e7535cab16cd426dd05c922190f75a2e9d9b3ac36ed0b63a247b4cfbe8c2'
  }
}
Flashloan is complete
`,
  ]

  static flags = {
    chain,
    mainnet,
    redeploy,
    loan: Flags.string({
      description: 'loan address',
      required: true,
    }),
    asset,
    amount,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(DebtTransfer)
    const walletKey = await getWalletKey()
    const params: {
      [key: string]: any,
    } = {
      cli: this.config.version,
      raApiKey: this.globalFlags['ra-key'],
      walletKey: walletKey,
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      loan: flags.loan,
      asset: flags.asset,
      amount: flags.amount,
    }

    if (flags.mainnet) {
      await this.risksConsent()
      params.mainnet = true
    }

    const url = new URL(this.apiUrl + '/debt/transfer')
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
