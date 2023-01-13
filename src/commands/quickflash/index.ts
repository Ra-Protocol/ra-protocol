import {BaseCommand} from '../../baseCommand'
import {ethers} from 'ethers'
import * as _ from 'lodash'
import {asset, chain, mainnet, redeploy, amount} from '../../flags'
import {buildEnvironment, environment} from '../../lib/environment'
import {callFlashLoan, deployArbitrageContract, maybeCallSetTokenAddresses} from '../../lib/ethers/quickflash'
import {validateAmount, validateAssets, validateChainSupported} from '../../lib/validate/quickflash'
import {exploreContract, exploreTransaction} from '../../lib/ethers/common'
import ArbV2 from '../../lib/constants/contracts/AaveV2UniV2/ArbV2.json'
import ArbV3 from '../../lib/constants/contracts/AaveV3UniV2/ArbV3.json'

export default class Quickflash extends BaseCommand<any> {
  static description = 'Easiest, quickest option to get a flash loan up and running'

  static examples = [
    `$ ra-protocol quickflash --chain ethereum --asset DAI --asset USDC --amount 1000000000000000000
Using wallet 0x85b4BCB925E5EBDe5d8509Fc22F0A850E03470dA on network ethereum testnet
Contract deployed
https://goerli.etherscan.io/address/0xab81938A2Cce68e455cbB5c27C2010a4f7B1ffb5
Contract token addresses updated
https://goerli.etherscan.io/tx/0x431d534a4f04f6ffd1d9a06ed61e3d0ea06882fefc7cccaccc1c98d3c4f6f687
Flashloan is complete
https://goerli.etherscan.io/tx/0x3147a6030f188b50850f01417788090a22674dc65ce48332d56d465fb49c0ad1
`,
  ]

  static flags = {
    chain,
    mainnet,
    redeploy,
    asset,
    amount,
  }

  async run(): Promise<void> {
    const env: environment = {} as any
    let contractAddress: string
    const {flags} = await this.parse(Quickflash)
    if (flags.mainnet) {
      await this.risksConsent()
    }

    await buildEnvironment(env, flags, this.globalFlags, this.invisibleFlags)
    validateAssets(env)
    validateAmount(env)
    validateChainSupported(env)

    contractAddress = _.get(this.storage, `contract.${flags.chain}.aave-${this.globalFlags['protocol-aave']}.uni-${this.globalFlags['protocol-uni']}`)
    if (!contractAddress || flags.redeploy) {
      contractAddress = await deployArbitrageContract(env)
      _.set(this.storage, `contract.${flags.chain}.aave-${this.globalFlags['protocol-aave']}.uni-${this.globalFlags['protocol-uni']}`, contractAddress)
      this.saveStorage()
      this.log(exploreContract(env, contractAddress))
    } else {
      this.log(`Reusing contract ${contractAddress}`)
    }

    env.contracts.loanContract = new ethers.Contract(contractAddress, env.network.protocols.aave === 'v2' ? ArbV2 : ArbV3, env.network.managedSigner)

    const setTokenAddressesHash = await maybeCallSetTokenAddresses(env)
    if (setTokenAddressesHash) {
      this.log(exploreTransaction(env, setTokenAddressesHash))
    }

    const flashLoanHash = await callFlashLoan(env)
    if (flashLoanHash) {
      this.log(exploreTransaction(env, flashLoanHash))
    }
  }
}
