import {Command} from '@oclif/core'
import {chain, type} from '../../flags'

export default class Quickflash extends Command {
  static description = 'Easiest, quickest option to get a flash loan up and running'

  static examples = [
    `$ ra-protocol quickflash --compiler 0.8.0
Flashloan is complete
`,
  ]

  static flags = {
    chain: chain,
    type: type,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Quickflash)

    this.log('Flashloan is complete')
  }
}
