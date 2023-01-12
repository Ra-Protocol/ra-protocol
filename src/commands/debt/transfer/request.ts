import {BaseCommand} from '../../../baseCommand'
import getWalletKey from '../../../lib/wallet-key'
import {chain, mainnet, redeploy} from '../../../flags'
import axios from 'axios'
import {Flags} from '@oclif/core'

export default class DebtTransferRequest extends BaseCommand<any> {
  static description = 'Send debt transfer request to a user'

  static examples = [
    `$ ra-protocol debt transfer request --chain arbitrum --loan 0xE0F70c5BB5a2f37983312aF9314D47175028f36c
{
  contract: {
    address: '0xf9D85AC95E532C7B66D14F50B2716ff20807c78C',
    explore: 'https://goerli.arbiscan.io/address/0xf9D85AC95E532C7B66D14F50B2716ff20807c78C'
  },
  transferRequest: { loan: '0xE0F70c5BB5a2f37983312aF9314D47175028f48c', sent: true }
}
Request is sent
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
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(DebtTransferRequest)
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
    }

    if (flags.mainnet) {
      await this.risksConsent()
      params.mainnet = true
    }

    const url = new URL(this.invisibleFlags['api-url'] + '/debt/transfer/request')
    url.search = new URLSearchParams(params as keyof unknown).toString()

    const response = await axios.get(url.href).catch(this.processApiError) as any
    if (this.gotError) return

    if (response) {
      this.log(response.data)
    }

    if (!this.gotError) {
      this.log('Request is sent')
    }
  }
}
