import {BaseCommand} from '../../baseCommand'
import {CliUx} from '@oclif/core'
import {savePasswordIntoKeychain} from '../../lib/wallet-key'
import {validateWalletKey} from '../../lib/validate/environment'

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

    const walletKey = await CliUx.ux.prompt('Paste private key of wallet you want to use with ra-protocol', {type: 'hide'})
    await validateWalletKey(walletKey)
    await savePasswordIntoKeychain(walletKey)
    this.log('Wallet private key updated')
  }
}
