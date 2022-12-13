ra-protocol
=================

RA Protocol CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/ra-protocol)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/Ra-Protocol/ra-protocol/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/ra-protocol)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/Ra-Protocol/ra-protocol/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ra-protocol
$ ra-protocol COMMAND
running command...
$ ra-protocol (--version)
ra-protocol/0.5.0 darwin-x64 node-v14.18.1
$ ra-protocol --help [COMMAND]
USAGE
  $ ra-protocol COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ra-protocol check-flashable`](#ra-protocol-check-flashable)
* [`ra-protocol check-most-liquid-flash`](#ra-protocol-check-most-liquid-flash)
* [`ra-protocol compile`](#ra-protocol-compile)
* [`ra-protocol config`](#ra-protocol-config)
* [`ra-protocol config get`](#ra-protocol-config-get)
* [`ra-protocol config set`](#ra-protocol-config-set)
* [`ra-protocol deploy`](#ra-protocol-deploy)
* [`ra-protocol help [COMMAND]`](#ra-protocol-help-command)
* [`ra-protocol quickflash`](#ra-protocol-quickflash)
* [`ra-protocol simulate`](#ra-protocol-simulate)

## `ra-protocol check-flashable`

Check the amount of liquidity currently flashable for a certain asset on a certain chain

```
USAGE
  $ ra-protocol check-flashable -c ethereum|bsc|avalanche|solana -a <value>

FLAGS
  -a, --asset=<value>...                       (required) specify asset
  -c, --chain=(ethereum|bsc|avalanche|solana)  (required) specify which chain

DESCRIPTION
  Check the amount of liquidity currently flashable for a certain asset on a certain chain

EXAMPLES
  $ ra-protocol check-flashable --chain ethereum
  Checking is complete

FLAG DESCRIPTIONS
  -a, --asset=<value>...  

    specify asset

  -c, --chain=(ethereum|bsc|avalanche|solana)

        ethereum: Ethereum
        bsc: Binance Smart Chain
        avalanche: Avalanche
        solana: Solana

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/check-flashable/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.5.0/dist/commands/check-flashable/index.ts)_

## `ra-protocol check-most-liquid-flash`

Checks all connected chains for the most liquid network available to flash loan an input asset

```
USAGE
  $ ra-protocol check-most-liquid-flash -c ethereum|bsc|avalanche|solana -a <value>

FLAGS
  -a, --asset=<value>...                       (required) specify asset
  -c, --chain=(ethereum|bsc|avalanche|solana)  (required) specify which chain

DESCRIPTION
  Checks all connected chains for the most liquid network available to flash loan an input asset

EXAMPLES
  $ ra-protocol check-most-liquid-flash --chain ethereum
  Checking is complete

FLAG DESCRIPTIONS
  -a, --asset=<value>...  

    specify asset

  -c, --chain=(ethereum|bsc|avalanche|solana)

        ethereum: Ethereum
        bsc: Binance Smart Chain
        avalanche: Avalanche
        solana: Solana

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/check-most-liquid-flash/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.5.0/dist/commands/check-most-liquid-flash/index.ts)_

## `ra-protocol compile`

Compiles the files in ‘contracts’ and then fills the build folder

```
USAGE
  $ ra-protocol compile -c <value>

FLAGS
  -c, --compiler=<value>  (required) The compiler ID being called (Should be set in the ra.config.js file)

DESCRIPTION
  Compiles the files in ‘contracts’ and then fills the build folder

EXAMPLES
  $ ra-protocol compile --compiler 0.8.0
  Compilation complete

FLAG DESCRIPTIONS
  -c, --compiler=<value>  

    The compiler ID being called (Should be set in the ra.config.js file)

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/compile/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.5.0/dist/commands/compile/index.ts)_

## `ra-protocol config`

Get/Set configuration

```
USAGE
  $ ra-protocol config

DESCRIPTION
  Get/Set configuration
```

_See code: [dist/commands/config/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.5.0/dist/commands/config/index.ts)_

## `ra-protocol config get`

Displays configuration

```
USAGE
  $ ra-protocol config get

DESCRIPTION
  Displays configuration

EXAMPLES
  $ ra-protocol config get
  Current configuration:
    protocol-aave: v3
    protocol-uni: v2
    privacy: pub
    tenderly-key: 4EFyPxPtcoyB4BFNAypscds2yI8mZGzM
    tenderly-user: cinderella
    tenderly-project: to-the-moon
```

## `ra-protocol config set`

Updates configuration

```
USAGE
  $ ra-protocol config set [--protocol-aave v2|v3] [--protocol-uni v2|v3] [--privacy pub|secret] [--ra-key
    <value>] [--tenderly-key <value>] [--tenderly-user <value>] [--tenderly-project <value>]

FLAGS
  --privacy=(pub|secret)      Transaction visiblity in the mempool
  --protocol-aave=(v2|v3)     Flash Loan protocol
  --protocol-uni=(v2|v3)      DEX protocol
  --ra-key=<value>            RA_API_KEY - generate at https://ra.xyz
  --tenderly-key=<value>      TENDERLY_ACCESS_KEY - generate at https://dashboard.tenderly.co/account/authorization
  --tenderly-project=<value>  TENDERLY_PROJECT - generate at https://dashboard.tenderly.co/projects/create or get from
                              https://dashboard.tenderly.co/projects
  --tenderly-user=<value>     TENDERLY_USER - get from https://dashboard.tenderly.co/account

DESCRIPTION
  Updates configuration

EXAMPLES
  $ ra-protocol set --privacy secret
    protocol-aave: v3
    protocol-uni: v2
    privacy: secret
    ra-key: d41d8cd98f00b204e9800998ecf8427e
    tenderly-key: 4EFyPxPtcoyB4BFNAypscds2yI8mZGzM
    tenderly-user: cinderella
    tenderly-project: to-the-moon
  Configuration updated

FLAG DESCRIPTIONS
  --privacy=(pub|secret)

        pub: Transaction should be sent publicly (visible in the mempool)
        secret: Should be sent in a secret channel in order to prevent front-running or copying of your transaction

  --protocol-aave=(v2|v3)

        v2: older AAVE protocol, however still available for use & required for Ethereum Mainnet (aave-v3 does not support this)
        v3: the most recent iteration of the AAVE protocol

  --protocol-uni=(v2|v3)

        v2: the standard generally used across all swap routers (Uniswap, Trader Joe, etc)
        v3: discrepancies between other routers as most are identical to UniswapV2

  --ra-key=<value>  

    RA_API_KEY - generate at https://ra.xyz

  --tenderly-key=<value>  

    TENDERLY_ACCESS_KEY - generate at https://dashboard.tenderly.co/account/authorization

  --tenderly-project=<value>  

    TENDERLY_PROJECT - generate at https://dashboard.tenderly.co/projects/create or get from
    https://dashboard.tenderly.co/projects

  --tenderly-user=<value>  

    TENDERLY_USER - get from https://dashboard.tenderly.co/account
```

## `ra-protocol deploy`

Deploy a contract that has been compiled

```
USAGE
  $ ra-protocol deploy -c ethereum|bsc|avalanche|solana -f eoa|sep|this

FLAGS
  -c, --chain=(ethereum|bsc|avalanche|solana)  (required) specify which chain
  -f, --from=(eoa|sep|this)                    (required) specify where flash should be from

DESCRIPTION
  Deploy a contract that has been compiled

EXAMPLES
  $ ra-protocol deploy --chain ethereum --from eao
  Deployment is complete

FLAG DESCRIPTIONS
  -c, --chain=(ethereum|bsc|avalanche|solana)

        ethereum: Ethereum
        bsc: Binance Smart Chain
        avalanche: Avalanche
        solana: Solana

  -f, --from=(eoa|sep|this)

        eao: From your EOA
        sep: From a separate contract
        this: From the same contract

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/deploy/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.5.0/dist/commands/deploy/index.ts)_

## `ra-protocol help [COMMAND]`

Display help for ra-protocol.

```
USAGE
  $ ra-protocol help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ra-protocol.

FLAG DESCRIPTIONS
  -n, --nested-commands  

    Include all nested commands in the output.

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.18/src/commands/help.ts)_

## `ra-protocol quickflash`

Easiest, quickest option to get a flash loan up and running

```
USAGE
  $ ra-protocol quickflash -c ethereum|bsc|avalanche|solana -t
    arb|liquidate|collateral-swap|eipfl|multiasset|custom -a <value> [-m] [-v <value>]

FLAGS
  -a, --asset=<value>...                                              (required) specify asset
  -c, --chain=(ethereum|bsc|avalanche|solana)                         (required) specify which chain
  -m, --mainnet                                                       specify to run on mainnet
  -t, --type=(arb|liquidate|collateral-swap|eipfl|multiasset|custom)  (required) Specify the type of flash loan preset
  -v, --value=<value>                                                 specify value

DESCRIPTION
  Easiest, quickest option to get a flash loan up and running

EXAMPLES
  $ ra-protocol quickflash --chain avalanche --type arb --asset DAI --asset USDC --value 1000000000000000000
  Paste private key of wallet you want to run quickflash from: ****************************************************************
  {
    contract: {
      address: '0xDD70A6B85bbfA9b8e36e77C0ce9ddBcba2De870A',
      explore: 'https://testnet.snowtrace.io/address/0xDD70A6B85bbfA9b8e36e77C0ce9ddBcba2De870A'
    },
    setTokenAddresses: {
      transactionHash: '0x0a0fd41c649dd8581a07954a352c50eb201e8c5f7f0994a71cf81bab445c8382',
      explore: 'https://testnet.snowtrace.io/tx/0x0a0fd41c649dd8581a07954a352c50eb201e8c5f7f0994a71cf81bab445c8382'
    },
    flashloan: {
      transactionHash: '0x5b489dbda79fb1a7a5d449cf973ee62ce6e3555836a68651b9a65771735ba501',
      explore: 'https://testnet.snowtrace.io/tx/0x5b489dbda79fb1a7a5d449cf973ee62ce6e3555836a68651b9a65771735ba501'
    }
  }
  Flashloan is complete

FLAG DESCRIPTIONS
  -a, --asset=<value>...  

    specify asset

  -c, --chain=(ethereum|bsc|avalanche|solana)

        ethereum: Ethereum
        bsc: Binance Smart Chain
        avalanche: Avalanche
        solana: Solana

  -m, --mainnet  

    specify to run on mainnet

  -t, --type=(arb|liquidate|collateral-swap|eipfl|multiasset|custom)

        arb: Basic arbitrage flash loan layout
             This will call an iteration of flashloanSimple, which calls makeArbitrage, swapping the
             flashloaned token for another token using one swap router, and then swapping back to the original
             token using another swap router

        liquidate: Basic liquidation flash loan
                   This will call an iteration of flashloanSimple, which calls makeArbitrage, adding the
                   flashloaned tokens as well as tokens within our contract balance as liquidity on a
                   token pair (AKA liquidity pool), and then removing the same amount of liquidity

        collateral-swap: Collateral swap flash loan
        eipfl: EIP-3156 interface flash loan
        multiasset: Multi-asset flash loan
                    This will call an iteration of flashloan, which borrows more than 1 token, which can
                    then be swapped, added as liquidity, etc. as long as all borrowed token amounts are
                    paid back at the end

        custom: Custom logic

  -v, --value=<value>  

    specify value

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/quickflash/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.5.0/dist/commands/quickflash/index.ts)_

## `ra-protocol simulate`

Simulates by running the simulate-default.js or simulate-custom.js files depending on the selection

```
USAGE
  $ ra-protocol simulate -f eoa|sep|this [-d mainnet|testnet] [-c mainnet|testnet]

FLAGS
  -c, --simulate-custom=(mainnet|testnet)   **USES TENDERLY** - Flash loan simulation function with custom logic file,
                                            uses “simulate-custom.js” file in “simulations” directory
  -d, --simulate-default=(mainnet|testnet)  **USES TENDERLY** - Required on flash loan simulation functions with default
                                            simulation parameters, uses “simulate-default.js” file in “simulations”
                                            directory
  -f, --from=(eoa|sep|this)                 (required) specify where flash should be from

DESCRIPTION
  Simulates by running the simulate-default.js or simulate-custom.js files depending on the selection

EXAMPLES
  $ ra-protocol simulate default --from sep --simulate-custom testnet
  Simulation is complete

FLAG DESCRIPTIONS
  -c, --simulate-custom=(mainnet|testnet)  

    **USES TENDERLY** - Flash loan simulation function with custom logic file, uses “simulate-custom.js” file in
    “simulations” directory

  -d, --simulate-default=(mainnet|testnet)  

    **USES TENDERLY** - Required on flash loan simulation functions with default simulation parameters, uses
    “simulate-default.js” file in “simulations” directory

  -f, --from=(eoa|sep|this)

        eao: From your EOA
        sep: From a separate contract
        this: From the same contract

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy, tenderly-key, tenderly-user, tenderly-project

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/simulate/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.5.0/dist/commands/simulate/index.ts)_
<!-- commandsstop -->
