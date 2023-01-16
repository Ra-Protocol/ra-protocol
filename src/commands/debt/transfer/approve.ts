import {BaseCommand} from '../../../baseCommand'
import {asset, chain, mainnet, amount, collateral} from '../../../flags'
import {Flags} from '@oclif/core'
import {buildEnvironment, environment} from '../../../lib/environment'
import {validateAmount, validateAsset, validateCollateral} from '../../../lib/validate/environment'
import {ethers} from 'ethers'
import DelegatorV2 from '../../../lib/constants/contracts/AaveV2UniV2/DelegatorV2.json'
import DelegatorV3 from '../../../lib/constants/contracts/AaveV3UniV2/DelegatorV3.json'
import {
  approveBorrower,
  approveERC20,
  depositCoinAsCollateral,
  depositCollateral,
  getBorrowingLimit,
} from '../../../lib/ethers/common'
import BorrowerDebtTransferV2 from '../../../lib/constants/contracts/AaveV2UniV2/BorrowerDebtTransferV2.json'
import BorrowerDebtTransferV3 from '../../../lib/constants/contracts/AaveV3UniV2/BorrowerDebtTransferV3.json'
import DelegatorDebtTransferV2 from '../../../lib/constants/contracts/AaveV2UniV2/DelegatorDebtTransferV2.json'
import DelegatorDebtTransferV3 from '../../../lib/constants/contracts/AaveV3UniV2/DelegatorDebtTransferV3.json'

export default class DebtTransferApprove extends BaseCommand<any> {
  static description = 'Approve debt transfer request (allow user to repay your loan with condition of delegating your borrowing power)'

  static examples = [
    `$ ra-protocol debt transfer approve --chain arbitrum --recipient recipient@gmail.com --collateral ETH --asset DAI --amount 0.001
Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
Called depositCoinAsCollateral at https://goerli.arbiscan.io/tx/0xd47b3b684a8aea1d054decd5c571bf309d208c8e019c879c2842ef01a59b196d
Available to borrow: 3.2 DAI
Called approveBorrower at https://goerli.arbiscan.io/tx/0x03843a63512ba2f9cdad29043ea0522bc3e5e59da01da9b7f32ae4b726892a2d
Debt transfer is approved
`,
  ]

  static flags = {
    chain,
    mainnet,
    recipient: Flags.string({
      description: 'email of debt recipient',
      required: true,
    }),
    collateral,
    asset,
    amount,
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    const {flags} = await this.parse(DebtTransferApprove)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const [collateralToken, collateralTokenDecimals] = validateCollateral(env)
    const [borrowToken, borrowTokenDecimals] = validateAsset(env)
    const amount = validateAmount(env, collateralTokenDecimals)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      collateral: flags.collateral,
      recipient: flags.recipient,
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const checkResponse = await this.callApi('/debt/transfer/approve', params) // throws error if request already exists
    const {borrowContractAddress, delegateContractAddress, transferContractAddress} = checkResponse.data

    env.contracts.borrowContract = new ethers.Contract(borrowContractAddress, env.network.protocols.aave === 'v2' ? BorrowerDebtTransferV2 : BorrowerDebtTransferV3, env.network.managedSigner)
    env.contracts.delegateContract = new ethers.Contract(delegateContractAddress, env.network.protocols.aave === 'v2' ? DelegatorV2 : DelegatorV3, env.network.managedSigner)
    env.contracts.transferContract = new ethers.Contract(transferContractAddress, env.network.protocols.aave === 'v2' ? DelegatorDebtTransferV2 : DelegatorDebtTransferV3, env.network.managedSigner)

    if (env.network.useWrapper) {
      await depositCoinAsCollateral(env, env.contracts.borrowContract, amount)
    } else {
      await approveERC20(env, collateralToken, borrowContractAddress, amount)
      await depositCollateral(env, env.contracts.borrowContract, amount)
    }

    const availableToBorrow = await getBorrowingLimit(env, env.contracts.transferContract, borrowContractAddress)
    console.log(`Available to borrow: ${ethers.utils.formatUnits(availableToBorrow, borrowTokenDecimals)} ${flags.asset}`)

    await approveBorrower(env,
      env.contracts.borrowContract,
      transferContractAddress,
      borrowToken,
      availableToBorrow,
    )

    await this.callApi('/debt/transfer/approve', {
      ...params,
      approved: true,
    })
    this.log('Debt transfer is approved')
  }
}
