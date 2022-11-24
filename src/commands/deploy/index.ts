import {BaseCommand} from '../../baseCommand'
import {chain, from} from '../../flags'

export default class Deploy extends BaseCommand<any> {
  static description = 'Deploy a contract that has been compiled'

  static examples = [
    `$ ra-protocol deploy --chain ethereum --from eao
Deployment is complete
`,
  ]

  static flags = {
    chain: chain,
    from: from,
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Deploy)

    this.log('Deployment is complete')
  }
}
