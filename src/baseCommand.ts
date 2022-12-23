import {Command, Flags, Interfaces} from '@oclif/core'
import * as fse from 'fs-extra'
import path = require('path')
const {prompt, Select} = require('enquirer')
import axios from 'axios'

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['globalFlags'] & T['flags']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  protected apiUrl = 'https://ra-protocol-api.vercel.app/api'

  protected globalFlags: any

  protected storage: any

  protected gotError = false

  protected flags!: Flags<T>

  protected storageFilename = path.join(this.config.configDir, 'storage.json')

  protected configFilename = path.join(this.config.configDir, 'config.json')

  protected saveStorage = () => {
    fse.writeJSONSync(this.storageFilename, this.storage)
  }

  protected readStorage: any = () => {
    if (!fse.existsSync(this.storageFilename)) {
      fse.outputFileSync(this.storageFilename, JSON.stringify({}))
    }

    return fse.readJSONSync(this.storageFilename)
  }

  protected saveConfig = () => {
    fse.writeJSONSync(this.configFilename, this.globalFlags)
  }

  protected wizard = async () => {
    if (!this.globalFlags['ra-key']) {
      const answer = await prompt({
        type: 'input',
        name: 'key',
        message: 'Enter your RA-API (private beta access) key',
      })

      const url = new URL(this.apiUrl + '/key')
      url.search = new URLSearchParams({
        raApiKey: answer.key,
      }).toString()

      await axios.get(url.href).catch(this.processApiError)
      if (this.gotError) return
      this.globalFlags['ra-key'] = answer.key
      this.saveConfig()
    }

    if (!this.globalFlags.simulate) {
      const question = await new Select({
        choices: ['No', 'Yes'],
        message: 'Do you want to enable simulation for flash loan transactions (requires tenderly API details)',
      })
      const answer = await question.run()
      this.globalFlags.simulate = answer === 'Yes' ? 'on' : 'off'
      if (answer === 'Yes') {
        const answers = await prompt([
          {
            type: 'input',
            name: 'tenderly-key',
            message: 'Enter your TENDERLY_ACCESS_KEY - generate at https://dashboard.tenderly.co/account/authorization',
          },
          {
            type: 'input',
            name: 'tenderly-user',
            message: 'Enter your TENDERLY_USER - get from https://dashboard.tenderly.co/account',
          },
          {
            type: 'input',
            name: 'tenderly-project',
            message: 'Enter your TENDERLY_PROJECT - generate at https://dashboard.tenderly.co/projects/create or get from https://dashboard.tenderly.co/projects',
          },
        ])
        for (const key of ['tenderly-key', 'tenderly-user', 'tenderly-project']) {
          this.globalFlags[key] = answers[key]
        }
      }

      this.saveConfig()
    }
  }

  protected readConfig: any = () => {
    if (!fse.existsSync(this.configFilename)) {
      fse.outputFileSync(this.configFilename, JSON.stringify({
        'api-url': 'https://api.ra.xyz/api',
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
    this.storage = this.readStorage()
    this.wizard()
    await super.init()
  }
}
