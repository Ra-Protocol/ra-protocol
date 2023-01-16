import {BaseCommand} from '../../baseCommand'
import getWalletKey from '../../lib/wallet-key'
import {chain, mainnet} from '../../flags'
import {buildEnvironment, environment} from '../../lib/environment'

export default class DebtStatus extends BaseCommand<any> {
  static description = 'approve borrow request (delegate borrowing power request to a user)'

  static examples = [
    `$ ra-protocol debt status --chain arbitrum
Your balance of debt to lender@gmail.com:
  DAI: 0.020400004052819184
`,
  ]

  static flags = {
    chain,
    mainnet,
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    const {flags} = await this.parse(DebtStatus)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const response = await this.callApi('/debt/status', params)
    if (this.gotError) return

    if (response && response.data.requests) {
      this.log('Your have pending borrow requests:')
      for (const borrower of Object.keys(response.data.requests)) {
        const {network, testnet, aave} = response.data.requests[borrower]
        this.log(`  from ${borrower} on ${network} ${testnet ? 'testnet' : ''} network (aave protocol: ${aave})`)
      }
    }

    if (response && response.data.transferRequests) {
      this.log('Your have pending debt transfer requests:')
      for (const origin of Object.keys(response.data.transferRequests)) {
        const {network, testnet, aave} = response.data.transferRequests[origin]
        this.log(`  from ${origin} on ${network} ${testnet ? 'testnet' : ''} network (aave protocol: ${aave})`)
      }
    }

    if (response && response.data.debts) {
      for (const lender of Object.keys(response.data.debts)) {
        this.log(`Your balance of debt to ${lender}:`)
        for (const tokenSymbol of Object.keys(response.data.debts[lender])) {
          for (const balance of Object.keys(response.data.debts[lender][tokenSymbol])) {
            const postfix = response.data.debts[lender][tokenSymbol][balance] ? ` (loan contract address: ${response.data.debts[lender][tokenSymbol][balance]})` : ''
            this.log(`  ${tokenSymbol}: ${balance}${postfix}`)
          }
        }
      }
    }

    if (!response || (!response.data.debts && !response.data.transferRequests && !response.data.requests)) {
      this.log('No debts or requests found')
    }
  }
}
