import {BaseCommand} from '../../baseCommand'
import getWalletKey from '../../lib/wallet-key'
import {asset, chain, mainnet, redeploy, amount, collateral} from '../../flags'
import axios from 'axios'
import {Flags} from '@oclif/core'

export default class DebtDelegate extends BaseCommand<any> {
  static description = 'approve borrow request (delegate borrowing power request to a user)'

  static examples = [
    `$ ra-protocol debt delegate --chain arbitrum --borrower borrower@gmail.com --collateral ETH --asset DAI --amount 0.001
{
  contract: {
    address: '0xf56846af288AbcAa1751f5Bc080E7bc4D93fAfBa',
    explore: 'https://goerli.arbiscan.io/address/0xf56846af288AbcAa1751f5Bc080E7bc4D93fAfBa'
  },
  approve: {
    transactionHash: '0xe9a010975288c6d49626a09e2b8ca355d968ddf8dc564be0438c67914844d12b',
    explore: 'https://goerli.arbiscan.io/tx/0xe9a010975288c6d49626a09e2b8ca355d968ddf8dc564be0438c67914844d12b'
  },
  depositCoinAsCollateral: {
    transactionHash: '0x7750522951fad50c0141d8f3cb2131695750ac286f89f0391fb7b5d85b76f875',
    explore: 'https://goerli.arbiscan.io/tx/0x7750522951fad50c0141d8f3cb2131695750ac286f89f0391fb7b5d85b76f875'
  },
  approveBorrower: {
    transactionHash: '0xde925d9111e00fd79e89dea30ff7d27f3a17fba812da72ba03b6a6b918254b52',
    explore: 'https://goerli.arbiscan.io/tx/0xde925d9111e00fd79e89dea30ff7d27f3a17fba812da72ba03b6a6b918254b52'
  }
}
credit delegation is approved
`,
  ]

  static flags = {
    chain,
    mainnet,
    redeploy,
    borrower: Flags.string({
      description: 'email of borrower',
      required: true,
    }),
    collateral,
    asset,
    amount,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(DebtDelegate)
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
      borrower: flags.borrower,
    }

    if (flags.mainnet) {
      await this.risksConsent()
      params.mainnet = true
    }

    if (flags.redeploy) {
      params.redeploy = true
    }

    const url = new URL(this.apiUrl + '/debt/delegate')
    url.search = new URLSearchParams(params as keyof unknown).toString()

    const response = await axios.get(url.href).catch(this.processApiError) as any
    if (this.gotError) return

    if (response) {
      this.log(response.data)
    }

    if (!this.gotError) {
      this.log('credit delegation is approved')
    }
  }
}
