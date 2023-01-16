import {BaseCommand} from '../../baseCommand'
import {asset, chain, mainnet, amount} from '../../flags'
import {Flags} from '@oclif/core'
import {approveERC20} from '../../lib/ethers/common'
import {buildEnvironment, environment} from '../../lib/environment'
import {validateAmount, validateAsset} from '../../lib/validate/environment'
import {repayDelegator} from '../../lib/ethers/debt/repay'

export default class DebtRepay extends BaseCommand<any> {
  static description = 'Easiest, quickest option to get a flash loan up and running'

  static examples = [
    `$ ra-protocol debt repay --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
ERC20 approved
Called repayDelegator at https://goerli.arbiscan.io/tx/0xaa0cc751c5b2325213f0449ba5256b585cc43a86c3fa5d921600873dc7fb3df1
`,
  ]

  static flags = {
    chain,
    mainnet,
    lender: Flags.string({
      description: 'email of lender',
      required: true,
    }),
    asset,
    amount,
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    const {flags} = await this.parse(DebtRepay)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const [borrowToken, borrowTokenDecimals] = validateAsset(env)
    const amount = validateAmount(env, borrowTokenDecimals)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      lender: flags.lender,
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const checkResponse = await this.callApi('/debt/borrow', params)
    const {delegateContractAddress} = checkResponse.data

    await approveERC20(env, borrowToken, delegateContractAddress, amount)

    await repayDelegator(env,
      borrowToken,
      amount,
      delegateContractAddress,
    )
  }
}
