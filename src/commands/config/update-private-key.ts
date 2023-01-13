import {BaseCommand} from '../../baseCommand'
import {CliUx} from '@oclif/core'
import {savePasswordIntoKeychain} from '../../lib/wallet-key'
import {validateWalletKey} from '../../lib/validate/environment'
const {Select} = require('enquirer')

export default class ConfigUpdatePK extends BaseCommand<any> {
  static description = 'Updates wallet private key (stored in macOS keychain)'

  static examples = [
    `$ ra-protocol config update-private-key
  Paste private key of wallet you want to use with ra-protocol: ****************************************************************
Wallet private key updated
`,
  ]

  async run(): Promise<void> {
    if (process.platform !== 'darwin') {
      this.error('saving private key is currently only supported on macOS')
    }

    if (this.globalFlags.dashboard === 'on') {
      const yesAnswer = 'Yes, I want to paste my wallet private key, and I AM willing to LOSE MY FUNDS'
      const noAnswer = 'No, I am NOT willing to lose funds'
      const question = await new Select({
        choices: [noAnswer, yesAnswer],
        message: 'Do you want to STOP using Truffle Dashboard for signing your transactions and EXPOSE your wallet private key?',
      })
      const answer = await question.run()
      if (answer === noAnswer) {
        this.error('Keep using Truffle Dashboard to keep your funds secure')
      }
    }

    const walletKey = await CliUx.ux.prompt('Paste private key of wallet you want to use with ra-protocol', {type: 'hide'})
    await validateWalletKey(walletKey)
    await savePasswordIntoKeychain(walletKey)
    if (this.globalFlags.dashboard) {
      this.globalFlags.dashboard = 'off'
      this.saveConfig()
      this.log('Turned off truffle dashboard usage in settings')
    }

    this.log('Wallet private key updated')
  }
}
