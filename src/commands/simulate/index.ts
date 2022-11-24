import {BaseCommand} from '../../baseCommand'
import {from} from '../../flags'
import {Flags} from '@oclif/core'

export default class Simulate extends BaseCommand<any> {
  static description = 'Simulates by running the simulate-default.js or simulate-custom.js files depending on the selection'

  static examples = [
    `<%= config.bin %> <%= command.id %> default --from sep --simulate-custom testnet
Simulation is complete
`,
  ]

  static flags = {
    from: from,
    'simulate-default': Flags.enum({
      char: 'd',
      description: '**USES TENDERLY** - Required on flash loan simulation functions with default simulation parameters, uses “simulate-default.js” file in “simulations” directory',
      options: ['mainnet', 'testnet'],
      exactlyOne: ['simulate-default', 'simulate-custom'],
    }),
    'simulate-custom': Flags.enum({
      char: 'c',
      description: '**USES TENDERLY** - Flash loan simulation function with custom logic file, uses “simulate-custom.js” file in “simulations” directory',
      options: ['mainnet', 'testnet'],
      exactlyOne: ['simulate-default', 'simulate-custom'],
    }),

  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Simulate)

    this.log('Simulation is complete')
  }
}
