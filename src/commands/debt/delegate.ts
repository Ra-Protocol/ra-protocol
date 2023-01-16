import {BaseCommand} from '../../baseCommand'
import {asset, chain, mainnet, amount, collateral} from '../../flags'
import {Flags} from '@oclif/core'
import {approveERC20} from '../../lib/ethers/common'
import {buildEnvironment, environment} from '../../lib/environment'
import {
  approveBorrower,
  deployDelegatorContract,
  depositCoinAsCollateral,
  depositCollateral,
} from '../../lib/ethers/debt/delegate'
import {ethers} from 'ethers'
import DelegatorV2 from '../../lib/constants/contracts/AaveV2UniV2/DelegatorV2.json'
import DelegatorV3 from '../../lib/constants/contracts/AaveV3UniV2/DelegatorV3.json'
import {validateAmount, validateAsset, validateCollateral} from '../../lib/validate/environment'
import {valueToBigNumber} from '../../lib/bignumber'

export default class DebtDelegate extends BaseCommand<any> {
  static description = 'approve borrow request (delegate borrowing power request to a user)'

  static examples = [
    `$ ra-protocol debt delegate --chain arbitrum --borrower borrower@gmail.com --collateral ETH --asset DAI --amount 0.001
Using wallet 0x85b4BCB925E5EBDe5d8509Fc22F0A850E03470dA on network arbitrum testnet
Contract deployed at https://goerli.arbiscan.io/address/0xb164e2800d1C18704d2be0A548591c285637aF84
Called depositCoinAsCollateral at https://goerli.arbiscan.io/tx/0xae58e97bd45d19fa3dc6be3a694b44f5fb00ce0b3cc852082109b344715993ed
Available to borrow: 3.2 DAI
Called approveBorrower at https://goerli.arbiscan.io/tx/0x1051387eda23dbfb43bd43793fb251b39ca6794046c7b7d73cbe6846f0ade995
Credit delegation is approved
`,
  ]

  static flags = {
    chain,
    mainnet,
    borrower: Flags.string({
      description: 'email of borrower',
      required: true,
    }),
    collateral,
    asset,
    amount,
  }

  async run(): Promise<void> {
    let delegateContractAddress
    const env: environment = {} as any
    const {flags} = await this.parse(DebtDelegate)
    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    const [collateralToken, collateralTokenDecimals] = validateCollateral(env)
    const [borrowToken, borrowTokenDecimals] = validateAsset(env)
    const amount = validateAmount(env, collateralTokenDecimals)
    const params: { [key: string]: any } = {
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      borrower: flags.borrower,
    }

    if (flags.mainnet) {
      await this.risksConsent()
    }

    const checkResponse = await this.callApi('/debt/delegate', params) // throws error if request already exists

    const borrowContractAddress = checkResponse.data.borrowContractAddress
    delegateContractAddress = checkResponse.data.delegateContractAddress
    if (!delegateContractAddress) {
      delegateContractAddress = await deployDelegatorContract(env)
      await this.callApi('/debt/delegate', {
        ...params,
        contract: delegateContractAddress,
      })
    }

    env.contracts.delegateContract = new ethers.Contract(delegateContractAddress, env.network.protocols.aave === 'v2' ? DelegatorV2 : DelegatorV3, env.network.managedSigner)

    if (env.network.useWrapper) {
      await depositCoinAsCollateral(env, amount)
    } else {
      await approveERC20(env, collateralToken, delegateContractAddress, amount)
      await depositCollateral(env)
    }

    const userAccountData = await env.contracts.delegateContract.getUserAccountData(delegateContractAddress)
    const assetPrice = await env.contracts.delegateContract.getAssetPrice(borrowToken)
    const availableToBorrow = ethers.utils.parseUnits(valueToBigNumber(userAccountData.availableBorrowsETH.toString()).div(assetPrice.toString()).toFixed(borrowTokenDecimals), borrowTokenDecimals)
    console.log(`Available to borrow: ${ethers.utils.formatUnits(availableToBorrow, borrowTokenDecimals)} ${flags.asset}`)

    await approveBorrower(env,
      borrowContractAddress,
      borrowToken,
      availableToBorrow,
    )

    this.log('Credit delegation is approved')
  }
}
