import {Flags} from '@oclif/core'

export const chain = Flags.enum({
  char: 'c',
  description: 'specify which chain',
  required: true,
  options: [
    'ethereum',
    'bsc',
    'avalanche',
    'solana',
  ],
})

export const asset = Flags.string({
  char: 'a',
  description: 'specify asset',
  multiple: true,
  required: true
})

export const value = Flags.string({
  char: 'v',
  description: 'specify value'
})

export const mainnet = Flags.boolean({
  char: 'm',
  description: 'specify to run on mainnet'
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

