import {CliUx} from '@oclif/core'
const keychain = require('keychain')

const getPasswordFromKeychain = async () => {
  return new Promise(fulfilled => {
    keychain.getPassword({account: 'privateKey', service: 'ra-protocol'}, (err: any, pass: string) => {
      fulfilled(pass)
    })
  })
}

export const savePasswordIntoKeychain = async (password: string) => {
  return new Promise(fulfilled => {
    keychain.setPassword({account: 'privateKey', service: 'ra-protocol', password}, () => {
      fulfilled(null)
    })
  })
}

const getWalletKey = async () => {
  if (process.platform !== 'darwin') {
    return CliUx.ux.prompt('Paste private key of wallet you want to run quickflash from', {type: 'hide'})
  }

  const password = await getPasswordFromKeychain()
  if (password) {
    return password
  }

  const walletKey = await CliUx.ux.prompt('Paste private key of wallet you want to run quickflash from', {type: 'hide'})
  await savePasswordIntoKeychain(walletKey)
  return walletKey
}

export default getWalletKey
