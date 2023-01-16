import {BaseCommand} from '../../baseCommand'
import {chain, mainnet} from '../../flags'
import {Flags} from '@oclif/core'
import {buildEnvironment, environment} from '../../lib/environment'
import {deployBorrowerContract} from '../../lib/ethers/debt/request'

export default class DebtRequest extends BaseCommand<any> {
  static description = 'Send loan request to a user'

  static examples = [
    `$ ra-protocol debt request --chain arbitrum --lender lender@gmail.com
Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
Contract deployed at https://goerli.arbiscan.io/address/0x0B39CBc3AE31f999d0418fc7FF0D4817A943B898
{ request: { lender: 'dmitry.matora@gmail.com', sent: true } }
Request is sent
`,
  ]

  static flags = {
    chain,
    mainnet,
    lender: Flags.string({
      description: 'email of lender',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    const {flags} = await this.parse(DebtRequest)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      lender: flags.lender,
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const checkResponse = await this.callApi('/debt/request', params) // throws error if request already exists
    if (JSON.stringify(checkResponse.data) === '{}') {
      const contractAddress = await deployBorrowerContract(env)
      const response = await this.callApi('/debt/request', {
        ...params,
        contract: contractAddress,
      })
      this.log(response.data)
    }

    this.log('Request is sent')
  }
}
