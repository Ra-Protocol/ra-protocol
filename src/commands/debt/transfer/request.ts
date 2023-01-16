import {BaseCommand} from '../../../baseCommand'
import {chain, mainnet} from '../../../flags'
import {Flags} from '@oclif/core'
import {buildEnvironment, environment} from '../../../lib/environment'
import {deployDelegatorDebtTransferContract} from '../../../lib/ethers/debt/transfer/request'

export default class DebtTransferRequest extends BaseCommand<any> {
  static description = 'Send debt transfer request to a user'

  static examples = [
    `$ ra-protocol debt transfer request --chain arbitrum --loan 0x0B39CBc3AE31f999d0418fc7FF0D4817A943B898
Using wallet 0xC443c9515916Cb698a2628A63C252BADf84BC961 on network arbitrum testnet
Contract deployed at https://goerli.arbiscan.io/address/0xe70Dc260ecD3e333E85B7fC3E5aa826E4935bfd8
{
  transferRequest: { loan: '0x0B39CBc3AE31f999d0418fc7FF0D4817A943B898', sent: true }
}
Request is sent
`,
  ]

  static flags = {
    chain,
    mainnet,
    loan: Flags.string({
      description: 'loan address',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    const {flags} = await this.parse(DebtTransferRequest)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      loan: flags.loan,
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const checkResponse = await this.callApi('/debt/transfer/request', params) // throws error if request already exists
    if (JSON.stringify(checkResponse.data) === '{}') {
      const contractAddress = await deployDelegatorDebtTransferContract(env)
      const response = await this.callApi('/debt/transfer/request', {
        ...params,
        contract: contractAddress,
      })
      this.log(response.data)
    }

    this.log('Request is sent')
  }
}
