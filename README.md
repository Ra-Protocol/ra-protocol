ra-protocol
=================

RA Protocol CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ra-protocol.svg)](https://npmjs.org/package/ra-protocol)
[![Downloads/week](https://img.shields.io/npm/dw/ra-protocol.svg)](https://npmjs.org/package/ra-protocol)
[![License](https://img.shields.io/npm/l/ra-protocol.svg)](https://github.com/Ra-Protocol/ra-protocol/blob/main/package.json)

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
ra-protocol/0.10.0 darwin-x64 node-v14.21.2
$ ra-protocol --help [COMMAND]
USAGE
  $ ra-protocol COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ra-protocol config`](#ra-protocol-config)
* [`ra-protocol config get`](#ra-protocol-config-get)
* [`ra-protocol config set`](#ra-protocol-config-set)
* [`ra-protocol config update-private-key`](#ra-protocol-config-update-private-key)
* [`ra-protocol debt borrow`](#ra-protocol-debt-borrow)
* [`ra-protocol debt delegate`](#ra-protocol-debt-delegate)
* [`ra-protocol debt repay`](#ra-protocol-debt-repay)
* [`ra-protocol debt request`](#ra-protocol-debt-request)
* [`ra-protocol debt status`](#ra-protocol-debt-status)
* [`ra-protocol debt transfer`](#ra-protocol-debt-transfer)
* [`ra-protocol debt transfer approve`](#ra-protocol-debt-transfer-approve)
* [`ra-protocol debt transfer request`](#ra-protocol-debt-transfer-request)
* [`ra-protocol help [COMMAND]`](#ra-protocol-help-command)
* [`ra-protocol quickflash`](#ra-protocol-quickflash)

## `ra-protocol config`

Get/Set configuration

```
USAGE
  $ ra-protocol config

DESCRIPTION
  Get/Set configuration
```

_See code: [dist/commands/config/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.10.0/dist/commands/config/index.ts)_

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
    simulate: on
    ra-key: d41d8cd98f00b204e9800998ecf8427e
    infura-key: e6abff3efce05b4891130f733ff6ac63
    tenderly-key: 4EFyPxPtcoyB4BFNAypscds2yI8mZGzM
    tenderly-user: cinderella
    tenderly-project: to-the-moon
```

## `ra-protocol config set`

Updates configuration

```
USAGE
  $ ra-protocol config set [--protocol-aave v2|v3] [--protocol-uni v2|v3] [--privacy pub|secret] [--simulate
    on|off] [--ra-key <value>] [--infura-key <value>] [--tenderly-key <value>] [--tenderly-user <value>]
    [--tenderly-project <value>]

FLAGS
  --infura-key=<value>        INFURA_API_KEY - generate at https://app.infura.io/dashboard
  --privacy=(pub|secret)      Transaction visiblity in the mempool
  --protocol-aave=(v2|v3)     Flash Loan protocol
  --protocol-uni=(v2|v3)      DEX protocol
  --ra-key=<value>            RA_API_KEY - generate at https://ra.xyz
  --simulate=(on|off)         Only execute flash loan transaction if tenderly simulation is successful
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
    simulate: on
    tenderly-key: 4EFyPxPtcoyB4BFNAypscds2yI8mZGzM
    tenderly-user: cinderella
    tenderly-project: to-the-moon
  Configuration updated

FLAG DESCRIPTIONS
  --infura-key=<value>  

    INFURA_API_KEY - generate at https://app.infura.io/dashboard

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

  --simulate=(on|off)  

    Only execute flash loan transaction if tenderly simulation is successful

  --tenderly-key=<value>  

    TENDERLY_ACCESS_KEY - generate at https://dashboard.tenderly.co/account/authorization

  --tenderly-project=<value>  

    TENDERLY_PROJECT - generate at https://dashboard.tenderly.co/projects/create or get from
    https://dashboard.tenderly.co/projects

  --tenderly-user=<value>  

    TENDERLY_USER - get from https://dashboard.tenderly.co/account
```

## `ra-protocol config update-private-key`

Updates wallet private key (stored in macOS keychain)

```
USAGE
  $ ra-protocol config update-private-key

DESCRIPTION
  Updates wallet private key (stored in macOS keychain)

EXAMPLES
  $ ra-protocol config update-private-key
    Paste private key of wallet you want to use with ra-protocol: ****************************************************************
  Wallet private key updated

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt borrow`

Perform approved loan from a user

```
USAGE
  $ ra-protocol debt borrow -c ethereum|arbitrum|avalanche --lender <value> --asset <value> [-m] [-r] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --asset=<value>...                         (required) specify asset
  --lender=<value>                           (required) email of lender

DESCRIPTION
  Perform approved loan from a user

EXAMPLES
  $ ra-protocol debt borrow --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
  {
    flashloan: {
      transactionHash: '0x11bc565368abbeec55df446eebe43e663419efc8cca7d15766f221c01cb6927a',
      explore: 'https://goerli.arbiscan.io/tx/0x11bc565368abbeec55df446eebe43e663419efc8cca7d15766f221c01cb6927a'
    },
    withdraw: {
      transactionHash: '0x3ae261ef80bdb8ff496136e8ff18229177461b615631db3f6b3f9ba7dcedb2a1',
      explore: 'https://goerli.arbiscan.io/tx/0x3ae261ef80bdb8ff496136e8ff18229177461b615631db3f6b3f9ba7dcedb2a1'
    }
  }
  Flashloan is complete

FLAG DESCRIPTIONS
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  --asset=<value>...  

    specify asset

  --lender=<value>  

    email of lender

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt delegate`

approve borrow request (delegate borrowing power request to a user)

```
USAGE
  $ ra-protocol debt delegate -c ethereum|arbitrum|avalanche --borrower <value> --collateral <value> --asset
    <value> [-m] [-r] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --asset=<value>...                         (required) specify asset
  --borrower=<value>                         (required) email of borrower
  --collateral=<value>...                    (required) specify collateral

DESCRIPTION
  approve borrow request (delegate borrowing power request to a user)

EXAMPLES
  $ ra-protocol debt delegate --chain arbitrum --borrower borrower@gmail.com --collateral ETH --asset DAI --amount 0.001
  {
    contract: {
      address: '0xf56846af288AbcAa1751f5Bc080E7bc4D93fAfBa',
      explore: 'https://goerli.arbiscan.io/address/0xf56846af288AbcAa1751f5Bc080E7bc4D93fAfBa'
    },
    approve: {
      transactionHash: '0xe9a010975288c6d49626a09e2b8ca355d968ddf8dc564be0438c67914844d12b',
      explore: 'https://goerli.arbiscan.io/tx/0xe9a010975288c6d49626a09e2b8ca355d968ddf8dc564be0438c67914844d12b'
    },
    depositCoinAsCollateral: {
      transactionHash: '0x7750522951fad50c0141d8f3cb2131695750ac286f89f0391fb7b5d85b76f875',
      explore: 'https://goerli.arbiscan.io/tx/0x7750522951fad50c0141d8f3cb2131695750ac286f89f0391fb7b5d85b76f875'
    },
    approveBorrower: {
      transactionHash: '0xde925d9111e00fd79e89dea30ff7d27f3a17fba812da72ba03b6a6b918254b52',
      explore: 'https://goerli.arbiscan.io/tx/0xde925d9111e00fd79e89dea30ff7d27f3a17fba812da72ba03b6a6b918254b52'
    }
  }
  credit delegation is approved

FLAG DESCRIPTIONS
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  --asset=<value>...  

    specify asset

  --borrower=<value>  

    email of borrower

  --collateral=<value>...  

    specify collateral

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt repay`

Easiest, quickest option to get a flash loan up and running

```
USAGE
  $ ra-protocol debt repay -c ethereum|arbitrum|avalanche --lender <value> --asset <value> [-m] [-r] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --asset=<value>...                         (required) specify asset
  --lender=<value>                           (required) email of lender

DESCRIPTION
  Easiest, quickest option to get a flash loan up and running

EXAMPLES
  $ ra-protocol debt repay --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
  {
    approve: {
      transactionHash: '0xe7c52a366800ae944590d7ca9072ddef9059902955b05bcce51ed22105550f9c',
      explore: 'https://goerli.arbiscan.io/tx/0xe7c52a366800ae944590d7ca9072ddef9059902955b05bcce51ed22105550f9c'
    },
    repay: {
      transactionHash: '0x67cf9436aef20919d2a434c4476f65c36208d4f6fc54effb3ecf8b7767f1c47b',
      explore: 'https://goerli.arbiscan.io/tx/0x67cf9436aef20919d2a434c4476f65c36208d4f6fc54effb3ecf8b7767f1c47b'
    }
  }
  Loan repayment is complete

FLAG DESCRIPTIONS
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  --asset=<value>...  

    specify asset

  --lender=<value>  

    email of lender

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt request`

Send loan request to a user

```
USAGE
  $ ra-protocol debt request -c ethereum|arbitrum|avalanche --lender <value> [-m] [-r] [-t]

FLAGS
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  -t, --transferable                         enable debt transfer support (experemental)
  --lender=<value>                           (required) email of lender

DESCRIPTION
  Send loan request to a user

EXAMPLES
  $ ra-protocol debt request --chain arbitrum --lender lender@gmail.com
  {
    contract: {
      address: '0x606a344B991635a112222111b5a27fcDd2b15BA1',
      explore: 'https://goerli.arbiscan.io/address/0x606a344B991635a112222111b5a27fcDd2b15BA1'
    },
    request: { lender: 'lender@gmail.com', sent: true }
  }
  Request is sent

FLAG DESCRIPTIONS
  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  -t, --transferable  

    enable debt transfer support (experemental)

  --lender=<value>  

    email of lender

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt status`

approve borrow request (delegate borrowing power request to a user)

```
USAGE
  $ ra-protocol debt status -c ethereum|arbitrum|avalanche [-m]

FLAGS
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet

DESCRIPTION
  approve borrow request (delegate borrowing power request to a user)

EXAMPLES
  $ ra-protocol debt status --chain arbitrum
  Your balance of debt to lender@gmail.com:
    DAI: 0.020400004052819184

FLAG DESCRIPTIONS
  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt transfer`

Perform approved debt transfer from another user

```
USAGE
  $ ra-protocol debt transfer -c ethereum|arbitrum|avalanche --loan <value> --asset <value> [-m] [-r] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --asset=<value>...                         (required) specify asset
  --loan=<value>                             (required) loan address

DESCRIPTION
  Perform approved debt transfer from another user

EXAMPLES
  $ ra-protocol debt transfer --chain arbitrum --loan 0xE0F70c5BB5a2f37983312aF9314D47175028f36c --asset DAI --amount 1
  {
    flashloanAndRepay: {
      transactionHash: '0xd6a71e07ed46a3049c69f57f352132fb62d3623371c405e1ad2c20a1ccd7ba6d',
      explore: 'https://goerli.arbiscan.io/tx/0xd6a71e07ed46a3049c69f57f352132fb62d3623371c405e1ad2c20a1ccd7ba6d'
    },
    withdraw: {
      transactionHash: '0x8737e7535cab16cd426dd05c922190f75a2e9d9b3ac36ed0b63a247b4cfbe8c2',
      explore: 'https://goerli.arbiscan.io/tx/0x8737e7535cab16cd426dd05c922190f75a2e9d9b3ac36ed0b63a247b4cfbe8c2'
    }
  }
  Flashloan is complete

FLAG DESCRIPTIONS
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  --asset=<value>...  

    specify asset

  --loan=<value>  

    loan address

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt transfer approve`

Approve debt transfer request (allow user to repay your loan with condition of delegating your borrowing power)

```
USAGE
  $ ra-protocol debt transfer approve -c ethereum|arbitrum|avalanche --recipient <value> --collateral <value> --asset
    <value> [-m] [-r] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --asset=<value>...                         (required) specify asset
  --collateral=<value>...                    (required) specify collateral
  --recipient=<value>                        (required) email of debt recipient

DESCRIPTION
  Approve debt transfer request (allow user to repay your loan with condition of delegating your borrowing power)

EXAMPLES
  $ ra-protocol debt transfer approve --chain arbitrum --recipient recipient@gmail.com --collateral ETH --asset DAI --amount 0.001
  {
    depositCoinAsCollateral: {
      transactionHash: '0x09fd138e91c2dfb00eaf7bc7fb47276c5d7d4211a740d7b716d32ce575824e1f',
      explore: 'https://goerli.arbiscan.io/tx/0x09fd138e91c2dfb00eaf7bc7fb47276c5d7d4211a740d7b716d32ce575824e1f'
    },
    approveBorrower: {
      transactionHash: '0x310245e87ac2764968df4ae18fdb609fe9bb7100a379e416dac38d8cfa3924fa',
      explore: 'https://goerli.arbiscan.io/tx/0x310245e87ac2764968df4ae18fdb609fe9bb7100a379e416dac38d8cfa3924fa'
    }
  }
  debt transfer is approved

FLAG DESCRIPTIONS
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  --asset=<value>...  

    specify asset

  --collateral=<value>...  

    specify collateral

  --recipient=<value>  

    email of debt recipient

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

## `ra-protocol debt transfer request`

Send debt transfer request to a user

```
USAGE
  $ ra-protocol debt transfer request -c ethereum|arbitrum|avalanche --loan <value> [-m] [-r]

FLAGS
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --loan=<value>                             (required) loan address

DESCRIPTION
  Send debt transfer request to a user

EXAMPLES
  $ ra-protocol debt transfer request --chain arbitrum --loan 0xE0F70c5BB5a2f37983312aF9314D47175028f36c
  {
    contract: {
      address: '0xf9D85AC95E532C7B66D14F50B2716ff20807c78C',
      explore: 'https://goerli.arbiscan.io/address/0xf9D85AC95E532C7B66D14F50B2716ff20807c78C'
    },
    transferRequest: { loan: '0xE0F70c5BB5a2f37983312aF9314D47175028f48c', sent: true }
  }
  Request is sent

FLAG DESCRIPTIONS
  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  --loan=<value>  

    loan address

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

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
  $ ra-protocol quickflash -c ethereum|arbitrum|avalanche --asset <value> [-m] [-r] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --asset=<value>...                         (required) specify asset

DESCRIPTION
  Easiest, quickest option to get a flash loan up and running

EXAMPLES
  $ ra-protocol quickflash --chain avalanche --asset DAI --asset USDC --amount 1000000000000000000
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
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  -r, --redeploy  

    force contract redeploy (on default, reusing last deployed contract)

  --asset=<value>...  

    specify asset

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/quickflash/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.10.0/dist/commands/quickflash/index.ts)_
<!-- commandsstop -->
