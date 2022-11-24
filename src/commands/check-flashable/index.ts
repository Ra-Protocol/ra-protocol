import {BaseCommand} from '../../baseCommand'
import {asset, chain} from '../../flags'

export default class CheckFlashable extends BaseCommand<any> {
  static description = 'Check the amount of liquidity currently flashable for a certain asset on a certain chain'

  static examples = [
    `$ ra-protocol check-flashable --chain ethereum
Checking is complete
`,
  ]

  static flags = {
    chain: chain,
    asset: asset,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(CheckFlashable)

    this.log('Checking is complete')
  }
}
