import {BaseCommand} from '../../baseCommand'
import ConfigSet from './set'

export default class Config extends BaseCommand<any> {
  static description = 'Get/Set configuration'

  static usage = 'config set --help'

  async run(): Promise<void> {
    this.log('Current configuration:')
    for (const key in ConfigSet.flags) {
      this.log(`  ${key}: ${this.globalFlags[key]}`)
    }
  }
}
