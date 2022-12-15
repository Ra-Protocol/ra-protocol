import {Command, Flags, Interfaces} from '@oclif/core'
import * as fse from 'fs-extra'
import path = require('path')

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['globalFlags'] & T['flags']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  protected apiUrl = 'https://ra-protocol-api.vercel.app/api'

  protected globalFlags: any

  protected gotError = false

  protected flags!: Flags<T>

  protected configFilename = path.join(this.config.configDir, 'config.json')

  protected saveConfig = () => {
    fse.writeJSONSync(this.configFilename, this.globalFlags)
  }

  protected readConfig: any = () => {
    if (!fse.existsSync(this.configFilename)) {
      fse.outputFileSync(this.configFilename, JSON.stringify({
        'api-url': 'https://ra-protocol-api.vercel.app/api',
        'protocol-aave': 'v3',
        'protocol-uni': 'v2',
        privacy: 'pub',
      }))
    }

    return fse.readJSONSync(this.configFilename)
  }

  protected processApiError = (error: any) => {
    this.gotError = true
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        if (error.response.data.error?.reason) {
          console.log(error.response.data)
          this.error('Network returned exception')
        } else {
          this.warn(error.response.data)
        }
      } else {
        this.error(error.response.data)
      }
    } else {
      if (error.request.res?.statusCode) {
        this.error(`API returned exception: ${error.request.res.statusCode} ${error.request.res.statusMessage}`)
      }

      this.error('Failed communicating with the server. Check your internet connection')
    }
  }

  public async init(): Promise<void> {
    this.globalFlags = this.readConfig()
    await super.init()
  }
}
