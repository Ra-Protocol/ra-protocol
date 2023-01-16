import {BaseCommand} from '../../../baseCommand'
import {asset, chain, mainnet, amount} from '../../../flags'
import {Flags} from '@oclif/core'
import {ethers} from 'ethers'
import BorrowerDebtTransferV2 from '../../../lib/constants/contracts/AaveV2UniV2/BorrowerDebtTransferV2.json'
import BorrowerDebtTransferV3 from '../../../lib/constants/contracts/AaveV3UniV2/BorrowerDebtTransferV3.json'
import DelegatorV2 from '../../../lib/constants/contracts/AaveV2UniV2/DelegatorV2.json'
import DelegatorV3 from '../../../lib/constants/contracts/AaveV3UniV2/DelegatorV3.json'
import DelegatorDebtTransferV2 from '../../../lib/constants/contracts/AaveV2UniV2/DelegatorDebtTransferV2.json'
import DelegatorDebtTransferV3 from '../../../lib/constants/contracts/AaveV3UniV2/DelegatorDebtTransferV3.json'
import {buildEnvironment, environment} from '../../../lib/environment'
import {validateAmount, validateAsset} from '../../../lib/validate/environment'
import {flashloanAndRepay} from '../../../lib/ethers/debt/transfer'

export default class DebtTransfer extends BaseCommand<any> {
  static description = 'Perform approved debt transfer from another user'

  static examples = [
    `$ ra-protocol debt transfer --chain arbitrum --loan 0xE0F70c5BB5a2f37983312aF9314D47175028f36c --asset DAI --amount 1
Using wallet 0xC443c9515916Cb698a2628A63C252BADf84BC961 on network arbitrum testnet
Called flashloanAndRepay at https://goerli.arbiscan.io/tx/0x3fbabf97f2adbf43eab715530fb95cf33676b0cc22af2938b7ae0bf6987782ab
Flashloan is complete
`,
  ]

  static flags = {
    chain,
    mainnet,
    loan: Flags.string({
      description: 'loan address',
      required: true,
    }),
    asset,
    amount,
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    const {flags} = await this.parse(DebtTransfer)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const [borrowToken, borrowTokenDecimals] = validateAsset(env)
    const amount = validateAmount(env, borrowTokenDecimals)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      loan: flags.loan,
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const checkResponse = await this.callApi('/debt/transfer', params) // throws error if request already exists
    const {borrowContractAddress, delegateContractAddress, transferContractAddress} = checkResponse.data

    env.contracts.borrowContract = new ethers.Contract(borrowContractAddress, env.network.protocols.aave === 'v2' ? BorrowerDebtTransferV2 : BorrowerDebtTransferV3, env.network.managedSigner)
    env.contracts.delegateContract = new ethers.Contract(delegateContractAddress, env.network.protocols.aave === 'v2' ? DelegatorV2 : DelegatorV3, env.network.managedSigner)
    env.contracts.transferContract = new ethers.Contract(transferContractAddress, env.network.protocols.aave === 'v2' ? DelegatorDebtTransferV2 : DelegatorDebtTransferV3, env.network.managedSigner)

    // const tokenBorrowAllowance = await env.contracts.borrowContract.getTokenBorrowAllowance(
    //   borrowToken,
    //   transferContractAddress,
    //   borrowContractAddress,
    //   1,
    // )
    // if (tokenBorrowAllowance.lt(ethers.BigNumber.from(amount))) {
    //   throw new Error(`Requested amount ${ethers.utils.formatUnits(amount, borrowTokenDecimals)} exceeds allowed ${ethers.utils.formatUnits(tokenBorrowAllowance, borrowTokenDecimals)}`)
    // }

    await flashloanAndRepay(
      env,
      borrowToken,
      amount,
      borrowContractAddress,
      delegateContractAddress,
    )

    this.log('Flashloan is complete')
  }
}
