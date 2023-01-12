import {BaseCommand} from '../../baseCommand'
import ConfigSet from './set'

export default class ConfigGet extends BaseCommand<any> {
  static description = 'Displays configuration'

  static examples = [
    `$ ra-protocol config get
Current configuration:
  protocol-aave: v3
  protocol-uni: v2
  privacy: pub
  simulate: on
  ra-key: d41d8cd98f00b204e9800998ecf8427e
  infura-key: e6abff3efce05b4891130f733ff6ac63
  tenderly-key: 4EFyPxPtcoyB4BFNAypscds2yI8mZGzM
  tenderly-user: cinderella
  tenderly-project: to-the-moon
`,
  ]

  async run(): Promise<void> {
    this.log('Current configuration:')
    for (const key in ConfigSet.flags) {
      this.log(`  ${key}: ${this.globalFlags[key]}`)
    }
  }
}
