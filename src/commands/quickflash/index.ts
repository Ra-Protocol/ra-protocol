import {BaseCommand} from '../../baseCommand'
import getWalletKey from '../../lib/wallet-key'
import {asset, chain, mainnet, redeploy, type, value} from '../../flags'
import axios from 'axios'
import * as _ from 'lodash'

export default class Quickflash extends BaseCommand<any> {
  static description = 'Easiest, quickest option to get a flash loan up and running'

  static examples = [
    `$ ra-protocol quickflash --chain avalanche --type arb --asset DAI --asset USDC --value 1000000000000000000
Paste private key of wallet you want to run quickflash from: ****************************************************************
{
  contract: {
    address: '0xDD70A6B85bbfA9b8e36e77C0ce9ddBcba2De870A',
    explore: 'https://testnet.snowtrace.io/address/0xDD70A6B85bbfA9b8e36e77C0ce9ddBcba2De870A'
  },
  setTokenAddresses: {
    transactionHash: '0x0a0fd41c649dd8581a07954a352c50eb201e8c5f7f0994a71cf81bab445c8382',
    explore: 'https://testnet.snowtrace.io/tx/0x0a0fd41c649dd8581a07954a352c50eb201e8c5f7f0994a71cf81bab445c8382'
  },
  flashloan: {
    transactionHash: '0x5b489dbda79fb1a7a5d449cf973ee62ce6e3555836a68651b9a65771735ba501',
    explore: 'https://testnet.snowtrace.io/tx/0x5b489dbda79fb1a7a5d449cf973ee62ce6e3555836a68651b9a65771735ba501'
  }
}
Flashloan is complete
`,
  ]

  static flags = {
    chain,
    mainnet,
    redeploy,
    type,
    asset,
    value,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Quickflash)
    const assets = flags.asset?.join(',')
    const walletKey = await getWalletKey()
    const params: {
      [key: string]: any,
    } = {
      raApiKey: this.globalFlags['ra-key'],
      walletKey: walletKey,
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      assets,
      value: flags.value,
    }
    const contractAddress = _.get(this.storage, `contract.${flags.chain}.aave-${this.globalFlags['protocol-aave']}.uni-${this.globalFlags['protocol-uni']}`)

    if (contractAddress) {
      params.contractAddress = contractAddress
    }

    if (flags.mainnet) {
      params.mainnet = true
    }

    if (flags.redeploy) {
      params.redeploy = true
    }

    if (this.globalFlags.simulate === 'on') {
      const bold = (text: string) => '\u001B[1m' + text + '\u001B[0m'
      if (!this.globalFlags['tenderly-key']) {
        this.error(`simulation requires setting tenderly key, run ${bold('ra-protocol set config --help')} for details`)
      }

      if (!this.globalFlags['tenderly-user']) {
        this.error(`simulation requires setting tenderly user, run ${bold('ra-protocol set config --help')} for details`)
      }

      if (!this.globalFlags['tenderly-project']) {
        this.error(`simulation requires setting tenderly project, run ${bold('ra-protocol set config --help')} for details`)
      }

      params.tenderlyKey = this.globalFlags['tenderly-key']
      params.tenderlyUser = this.globalFlags['tenderly-user']
      params.tenderlyProject = this.globalFlags['tenderly-project']
    }

    const url = new URL(this.apiUrl + '/quickflash')
    url.search = new URLSearchParams(params as keyof unknown).toString()

    const response = await axios.get(url.href).catch(this.processApiError) as any
    if (response.data && response.data.contract) {
      _.set(this.storage, `contract.${flags.chain}.aave-${this.globalFlags['protocol-aave']}.uni-${this.globalFlags['protocol-uni']}`, response.data.contract.address)
      this.saveStorage()
    }

    if (response) {
      this.log(response.data)
    }

    if (!this.gotError && !(response.data && response.data.flashloan && !response.data.flashloan.error)) {
      this.log('Flashloan is complete')
    }
  }
}
