import {Flags} from '@oclif/core'

export const chain = Flags.enum({
  char: 'c',
  description: 'specify which chain',
  required: true,
  options: [
    'ethereum',
    'arbitrum',
    'avalanche',
  ],
})

export const collateral = Flags.string({
  description: 'specify collateral',
  required: true,
})

export const masset = Flags.string({
  description: 'specify asset',
  multiple: true,
  required: true,
})

export const asset = Flags.string({
  description: 'specify asset',
  required: true,
})

export const amount = Flags.string({
  char: 'a',
  description: 'specify amount',
})

export const mainnet = Flags.boolean({
  char: 'm',
  description: 'specify to run on mainnet',
})

export const redeploy = Flags.boolean({
  char: 'r',
  description: 'force contract redeploy (on default, reusing last deployed contract)',
})

export const from = Flags.enum({
  char: 'f',
  description: 'specify where flash should be from',
  required: true,
  options: [
    'eoa',
    'sep',
    'this',
  ],
})

export const type = Flags.enum({
  char: 't',
  description: 'Specify the type of flash loan preset',
  required: true,
  options: [
    'arb',
    'liquidate',
    'collateral-swap',
    'eipfl',
    'multiasset',
    'custom',
  ],
})

