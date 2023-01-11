import {BaseCommand} from '../../baseCommand'
import getWalletKey from '../../lib/wallet-key'
import {chain, mainnet, redeploy} from '../../flags'
import axios from 'axios'
import {Flags} from '@oclif/core'

export default class DebtRequest extends BaseCommand<any> {
  static description = 'Send loan request to a user'

  static examples = [
    `$ ra-protocol debt request --chain arbitrum --lender lender@gmail.com
{
  contract: {
    address: '0x606a344B991635a112222111b5a27fcDd2b15BA1',
    explore: 'https://goerli.arbiscan.io/address/0x606a344B991635a112222111b5a27fcDd2b15BA1'
  },
  request: { lender: 'lender@gmail.com', sent: true }
}
Request is sent
`,
  ]

  static flags = {
    chain,
    mainnet,
    redeploy,
    transferable: Flags.boolean({
      char: 't',
      description: 'enable debt transfer support (experemental)',
    }),
    lender: Flags.string({
      description: 'email of lender',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(DebtRequest)
    const walletKey = await getWalletKey()
    const params: {
      [key: string]: any,
    } = {
      cli: this.config.version,
      raApiKey: this.globalFlags['ra-key'],
      walletKey: walletKey,
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      lender: flags.lender,
    }

    if (flags.mainnet) {
      await this.risksConsent()
      params.mainnet = true
    }

    if (flags.transferable) {
      params.transferable = true
    }

    if (flags.redeploy) {
      params.redeploy = true
    }

    const url = new URL(this.apiUrl + '/debt/request')
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
