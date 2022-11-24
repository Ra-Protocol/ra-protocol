import {Command, Flags, Interfaces} from '@oclif/core'
import * as fse from 'fs-extra'
import path = require('path')

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['globalFlags'] & T['flags']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  protected globalFlags: any

  protected flags!: Flags<T>

  public async init(): Promise<void> {
    const configFilename = path.join(this.config.configDir, 'config.json')
    if (!fse.existsSync(configFilename)) {
      fse.outputFileSync(configFilename, JSON.stringify({
        'protocol-aave': 'v3',
        'protocol-uni': 'v2',
        privacy: 'pub',
      }))
    }
    this.globalFlags = fse.readJSONSync(configFilename)
    await super.init()
  }
}
