import {BaseCommand} from '../../baseCommand'
import ConfigSet from './set'
import chalk from 'chalk'

export default class Config extends BaseCommand<any> {
  static description = 'Get/Set configuration'

  async run(): Promise<void> {
    this.log('Current configuration:')
    for (const key in ConfigSet.flags) {
      this.log(`  ${key}: ${this.globalFlags[key]}`)
    }

    this.log('\nFor details run\n' +
      chalk.bold('$') + ' ra-protocol config set --help')
  }
}
