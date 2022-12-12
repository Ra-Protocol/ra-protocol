import {BaseCommand} from '../../baseCommand'
import {asset, chain, mainnet, type, value} from '../../flags'
import {CliUx} from '@oclif/core'
import axios from 'axios'

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
    chain: chain,
    mainnet: mainnet,
    type: type,
    asset: asset,
    value: value,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Quickflash)
    const assets = flags.asset?.join(',')
    const key = await CliUx.ux.prompt('Paste private key of wallet you want to run quickflash from', {type: 'hide'})
    const params = {
      key: key,
      chain: flags.chain,
      'protocol-aave': this.globalFlags['protocol-aave'],
      assets: assets,
      value: flags.value,
    }
    const url = new URL(this.apiUrl + '/quickflash')
    url.search = new URLSearchParams((flags.mainnet ? {...params, mainnet: true} : params) as keyof unknown).toString()

    const response = await axios.get(url.href).catch(this.processApiError)
    if (response) {
      this.log(response.data)
    }

    if (!this.gotError) {
      this.log('Flashloan is complete')
    }
  }
}
