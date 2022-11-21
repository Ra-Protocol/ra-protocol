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
  description: 'specify asset (Optional)'
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

