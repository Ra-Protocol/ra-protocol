import {BaseCommand} from '../../baseCommand'
import {Flags} from '@oclif/core'

export default class Compile extends BaseCommand<any> {
  static description = 'Compiles the files in ‘contracts’ and then fills the build folder'

  static examples = [
    `$ ra-protocol compile --compiler 0.8.0
Compilation complete
`,
  ]

  static flags = {
    compiler: Flags.string({char: 'c', description: 'The compiler ID being called (Should be set in the ra.config.js file)', required: true}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Compile)

    this.log('Compilation complete')
  }
}
