import {BaseCommand} from '../../../baseCommand'
import {Flags} from '@oclif/core'

export default class ConfigSetInvisible extends BaseCommand<any> {
  static description = 'Updates invisible keys in configuration'

  static hidden = true

  static flags = {
    'api-url': Flags.string({
      description: 'API url',
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(ConfigSetInvisible)
    const key = Object.keys(flags)[0]

    let changed = false
    for (const key in ConfigSetInvisible.flags) {
      if (flags[key]) {
        if (this.invisibleFlags[key] !== flags[key]) {
          changed = true
        }

        this.invisibleFlags[key] = flags[key]
      }
    }

    this.saveInvisibleConfig()
    for (const key in ConfigSetInvisible.flags) {
      this.log(`  ${key}: ${this.invisibleFlags[key] || '<unset>'}`)
    }

    if (!key) {
      return
    }

    if (changed) {
      this.log('Configuration updated')
    } else {
      this.warn(`Configuration unchanged, ${key} value is already "${flags[key]}"`)
    }
  }
}
