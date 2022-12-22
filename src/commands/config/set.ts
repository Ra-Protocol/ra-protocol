import {BaseCommand} from '../../baseCommand'
import {Flags} from '@oclif/core'

export default class ConfigSet extends BaseCommand<any> {
  static description = 'Updates configuration'

  static examples = [
    `$ ra-protocol set --privacy secret
  protocol-aave: v3
  protocol-uni: v2
  privacy: secret
  ra-key: d41d8cd98f00b204e9800998ecf8427e
  tenderly-key: 4EFyPxPtcoyB4BFNAypscds2yI8mZGzM
  tenderly-user: cinderella
  tenderly-project: to-the-moon
Configuration updated
`,
  ]

  static flags = {
    'protocol-aave': Flags.enum({
      description: 'Flash Loan protocol',
      options: [
        'v2',
        'v3',
      ],
      exactlyOne: [
        'protocol-aave',
        'protocol-uni',
        'privacy',
        'ra-key',
        'simulate',
        'tenderly-key',
        'tenderly-user',
        'tenderly-project',
      ],
    }),
    'protocol-uni': Flags.enum({
      description: 'DEX protocol',
      options: [
        'v2',
        'v3',
      ],
    }),
    privacy: Flags.enum({
      description: 'Transaction visiblity in the mempool',
      options: [
        'pub',
        'secret',
      ],
    }),
    simulate: Flags.enum({
      description: 'Only execute flash loan transaction if tenderly simulation is successful',
      options: [
        'on',
        'off',
      ],
    }),
    'ra-key': Flags.string({
      description: 'RA_API_KEY - generate at https://ra.xyz',
    }),
    'tenderly-key': Flags.string({
      description: 'TENDERLY_ACCESS_KEY - generate at https://dashboard.tenderly.co/account/authorization',
    }),
    'tenderly-user': Flags.string({
      description: 'TENDERLY_USER - get from https://dashboard.tenderly.co/account',
    }),
    'tenderly-project': Flags.string({
      description: 'TENDERLY_PROJECT - generate at https://dashboard.tenderly.co/projects/create or get from https://dashboard.tenderly.co/projects',
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(ConfigSet)
    const key = Object.keys(flags)[0]
    if (key === 'simulate') {
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
    }

    let changed = false
    for (const key in ConfigSet.flags) {
      if (flags[key]) {
        if (this.globalFlags[key] !== flags[key]) {
          changed = true
        }

        this.globalFlags[key] = flags[key]
      }

      this.log(`  ${key}: ${this.globalFlags[key] || '<unset>'}`)
    }

    this.saveConfig()
    if (changed) {
      this.log('Configuration updated')
    } else {
      this.warn(`Configuration unchanged, ${key} value is already "${flags[key]}"`)
    }
  }
}
