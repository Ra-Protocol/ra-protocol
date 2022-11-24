import {BaseCommand} from '../../baseCommand'
import {asset, chain} from '../../flags'

export default class CheckMostLiquidFlash extends BaseCommand<any> {
  static description = 'Checks all connected chains for the most liquid network available to flash loan an input asset'

  static examples = [
    `$ ra-protocol check-most-liquid-flash --chain ethereum
Checking is complete
`,
  ]

  static flags = {
    chain: chain,
    asset: asset,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(CheckMostLiquidFlash)

    this.log('Checking is complete')
  }
}
