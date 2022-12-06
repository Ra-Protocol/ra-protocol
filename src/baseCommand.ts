import {Command, Flags, Interfaces} from '@oclif/core'
import * as fse from 'fs-extra'
import path = require('path')

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['globalFlags'] & T['flags']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  protected apiUrl = 'https://ra-protocol-api.vercel.app/api'

  protected globalFlags: any

  protected flags!: Flags<T>

  protected processApiError = (error: any) => {
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        this.warn(error.response.data)
      } else {
        this.error(error.response.data)
      }
    } else {
      this.error('Failed communicating with the server. Check your internet connection')
    }
  }

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
