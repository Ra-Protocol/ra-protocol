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
ra-protocol/0.12.2 darwin-x64 node-v14.21.2
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

_See code: [dist/commands/config/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.12.2/dist/commands/config/index.ts)_

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
  $ ra-protocol config set [--protocol-aave v2|v3] [--protocol-uni v2|v3] [--privacy pub|secret] [--dashboard
    on|off] [--simulate on|off] [--ra-key <value>] [--infura-key <value>] [--tenderly-key <value>] [--tenderly-user
    <value>] [--tenderly-project <value>]

FLAGS
  --dashboard=(on|off)        Use truffle dashboard to sign transactions
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
  --dashboard=(on|off)  

    Use truffle dashboard to sign transactions

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
  --asset=<value>                            (required) specify asset
  --lender=<value>                           (required) email of lender

DESCRIPTION
  Perform approved loan from a user

EXAMPLES
  $ ra-protocol debt borrow --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
  Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
  http://localhost:3000/api/debt/borrow?cli=0.12.1&raApiKey=ce10be268b2c006f1483012e97b68d8b&chain=arbitrum&protocol-aave=v3&lender=dmitry.matora%40gmail.com
  Approved for borrowing: 3.2 DAI
  Called flashloan at https://goerli.arbiscan.io/tx/0x8c1a93d9ad5865e5e1d9d6091b29481cabe364457bd3731104d44d58e63d2878

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

  --asset=<value>  

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
    <value> [-m] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  --asset=<value>                            (required) specify asset
  --borrower=<value>                         (required) email of borrower
  --collateral=<value>                       (required) specify collateral

DESCRIPTION
  approve borrow request (delegate borrowing power request to a user)

EXAMPLES
  $ ra-protocol debt delegate --chain arbitrum --borrower borrower@gmail.com --collateral ETH --asset DAI --amount 0.001
  Using wallet 0x85b4BCB925E5EBDe5d8509Fc22F0A850E03470dA on network arbitrum testnet
  Contract deployed at https://goerli.arbiscan.io/address/0xb164e2800d1C18704d2be0A548591c285637aF84
  Called depositCoinAsCollateral at https://goerli.arbiscan.io/tx/0xae58e97bd45d19fa3dc6be3a694b44f5fb00ce0b3cc852082109b344715993ed
  Available to borrow: 3.2 DAI
  Called approveBorrower at https://goerli.arbiscan.io/tx/0x1051387eda23dbfb43bd43793fb251b39ca6794046c7b7d73cbe6846f0ade995
  Credit delegation is approved

FLAG DESCRIPTIONS
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  --asset=<value>  

    specify asset

  --borrower=<value>  

    email of borrower

  --collateral=<value>  

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
  $ ra-protocol debt repay -c ethereum|arbitrum|avalanche --lender <value> --asset <value> [-m] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  --asset=<value>                            (required) specify asset
  --lender=<value>                           (required) email of lender

DESCRIPTION
  Easiest, quickest option to get a flash loan up and running

EXAMPLES
  $ ra-protocol debt repay --chain arbitrum --lender lender@gmail.com --asset DAI --amount 1
  Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
  ERC20 approved
  Called repayDelegator at https://goerli.arbiscan.io/tx/0xaa0cc751c5b2325213f0449ba5256b585cc43a86c3fa5d921600873dc7fb3df1

FLAG DESCRIPTIONS
  -a, --amount=<value>  

    specify amount

  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

  --asset=<value>  

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
  $ ra-protocol debt request -c ethereum|arbitrum|avalanche --lender <value> [-m]

FLAGS
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  --lender=<value>                           (required) email of lender

DESCRIPTION
  Send loan request to a user

EXAMPLES
  $ ra-protocol debt request --chain arbitrum --lender lender@gmail.com
  Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
  Contract deployed
  https://goerli.arbiscan.io/address/0x0B39CBc3AE31f999d0418fc7FF0D4817A943B898
  { request: { lender: 'dmitry.matora@gmail.com', sent: true } }
  Request is sent

FLAG DESCRIPTIONS
  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

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
  --asset=<value>                            (required) specify asset
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

  --asset=<value>  

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
  --asset=<value>                            (required) specify asset
  --collateral=<value>                       (required) specify collateral
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

  --asset=<value>  

    specify asset

  --collateral=<value>  

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
  $ ra-protocol quickflash -c ethereum|arbitrum|avalanche --masset <value> [-m] [-r] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  -r, --redeploy                             force contract redeploy (on default, reusing last deployed contract)
  --masset=<value>...                        (required) specify asset

DESCRIPTION
  Easiest, quickest option to get a flash loan up and running

EXAMPLES
  $ ra-protocol quickflash --chain ethereum --asset DAI --asset USDC --amount 1000000000000000000
  Using wallet 0x85b4BCB925E5EBDe5d8509Fc22F0A850E03470dA on network ethereum testnet
  Contract deployed
  https://goerli.etherscan.io/address/0xab81938A2Cce68e455cbB5c27C2010a4f7B1ffb5
  Contract token addresses updated
  https://goerli.etherscan.io/tx/0x431d534a4f04f6ffd1d9a06ed61e3d0ea06882fefc7cccaccc1c98d3c4f6f687
  Flashloan is complete
  https://goerli.etherscan.io/tx/0x3147a6030f188b50850f01417788090a22674dc65ce48332d56d465fb49c0ad1

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

  --masset=<value>...  

    specify asset

CONFIG USAGE
  This command behavior affected by following config variables: protocol-aave, protocol-uni, privacy

  For details run
  $ ra-protocol config set --help
```

_See code: [dist/commands/quickflash/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.12.2/dist/commands/quickflash/index.ts)_
<!-- commandsstop -->
