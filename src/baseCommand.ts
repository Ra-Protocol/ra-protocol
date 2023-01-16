import {Command, Flags, Interfaces} from '@oclif/core'
import * as fse from 'fs-extra'
import path = require('path')
const {prompt, Select} = require('enquirer')
import axios from 'axios'

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['globalFlags'] & T['flags']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  protected dev = false

  protected globalFlags: any

  protected invisibleFlags: any

  protected storage: any

  protected gotError = false

  protected flags!: Flags<T>

  protected storageFilename = path.join(this.config.configDir, 'storage.json')

  protected configFilename = path.join(this.config.configDir, 'config.json')

  protected invisibleConfigFilename = path.join(this.config.configDir, 'config.invisible.json')

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

  protected saveInvisibleConfig = () => {
    fse.writeJSONSync(this.invisibleConfigFilename, this.invisibleFlags)
  }

  protected risksConsent = async () => {
    this.error('mainnet operations are currently disabled for security upgrades')
    const yesAnswer = 'Yes, I am willing to lose funds'
    const noAnswer = 'No, I am NOT willing to lose funds'
    const question = await new Select({
      choices: [noAnswer, yesAnswer],
      message: 'This is beta. On mainnet only use funds you`re willing to lose!',
    })
    const answer = await question.run()
    if (answer === noAnswer) {
      this.error('To avoid loosing funds use testnet')
    }
  }

  protected wizard = async () => {
    if (!this.globalFlags['ra-key']) {
      const answer = await prompt({
        type: 'input',
        name: 'key',
        message: 'Enter your RA-API (private beta access) key',
      })

      const url = new URL(this.invisibleFlags['api-url'] + '/key')
      url.search = new URLSearchParams({
        raApiKey: answer.key,
      }).toString()

      await axios.get(url.href).catch(this.processApiError)
      if (this.gotError) return
      this.globalFlags['ra-key'] = answer.key
      this.saveConfig()
    }

    if (!this.globalFlags.dashboard) {
      const yesAnswer = 'Yes, I am not willing to lose funds'
      const noAnswer = 'No, I want to paste my wallet private key, and I AM willing to LOSE FUNDS'
      const question = await new Select({
        choices: [yesAnswer, noAnswer],
        message: 'Do you want to use Truffle Dashboard for signing your transactions to avoid exposing your wallet private key?',
      })
      const answer = await question.run()
      this.globalFlags.dashboard = answer === yesAnswer ? 'on' : 'off'
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
        'protocol-aave': 'v3',
        'protocol-uni': 'v2',
        privacy: 'pub',
      }))
    }

    return fse.readJSONSync(this.configFilename)
  }

  protected readInvisibleConfig: any = () => {
    if (!fse.existsSync(this.invisibleConfigFilename)) {
      fse.outputFileSync(this.invisibleConfigFilename, JSON.stringify({
        'api-url': 'https://api.ra.xyz/api',
      }))
    }

    return {
      ...fse.readJSONSync(this.invisibleConfigFilename),
      version: this.config.version,
    }
  }

  protected callApi = async (path: string, params: any) => {
    const url = new URL(this.invisibleFlags['api-url'] + path)
    const paramsExtended = {
      cli: this.config.version,
      raApiKey: this.globalFlags['ra-key'],
      ...params,
    }
    url.search = new URLSearchParams(paramsExtended as keyof unknown).toString()
    if (this.dev) this.log(url.href)
    return axios.get(url.href).catch(this.processApiError) as any
  }

  protected processApiError = (error: any) => {
    this.gotError = true
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        if (error.response.data.error?.reason) {
          console.log(error.response.data)
          this.error('Network returned exception')
        }

        if (error.response.data.error) {
          this.error(`API returned exception: ${error.response.data.error}`)
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
    this.dev = this.config.options.root.endsWith('dev')
    this.globalFlags = this.readConfig()
    this.invisibleFlags = this.readInvisibleConfig()
    this.storage = this.readStorage()
    await this.wizard()
    await super.init()
  }
}
