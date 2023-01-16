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
ra-protocol/0.12.3 darwin-x64 node-v14.21.2
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

_See code: [dist/commands/config/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.12.3/dist/commands/config/index.ts)_

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
  Got ERC20 approval for DAI transfer
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
  Contract deployed at https://goerli.arbiscan.io/address/0x0B39CBc3AE31f999d0418fc7FF0D4817A943B898
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
  $ ra-protocol debt transfer -c ethereum|arbitrum|avalanche --loan <value> --asset <value> [-m] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  --asset=<value>                            (required) specify asset
  --loan=<value>                             (required) loan address

DESCRIPTION
  Perform approved debt transfer from another user

EXAMPLES
  $ ra-protocol debt transfer --chain arbitrum --loan 0xE0F70c5BB5a2f37983312aF9314D47175028f36c --asset DAI --amount 1
  Using wallet 0xC443c9515916Cb698a2628A63C252BADf84BC961 on network arbitrum testnet
  Called flashloanAndRepay at https://goerli.arbiscan.io/tx/0x3fbabf97f2adbf43eab715530fb95cf33676b0cc22af2938b7ae0bf6987782ab
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
    <value> [-m] [-a <value>]

FLAGS
  -a, --amount=<value>                       specify amount
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  --asset=<value>                            (required) specify asset
  --collateral=<value>                       (required) specify collateral
  --recipient=<value>                        (required) email of debt recipient

DESCRIPTION
  Approve debt transfer request (allow user to repay your loan with condition of delegating your borrowing power)

EXAMPLES
  $ ra-protocol debt transfer approve --chain arbitrum --recipient recipient@gmail.com --collateral ETH --asset DAI --amount 0.001
  Using wallet 0x26811622A429E51370Df573c2dBD695242a878e7 on network arbitrum testnet
  Called depositCoinAsCollateral at https://goerli.arbiscan.io/tx/0xd47b3b684a8aea1d054decd5c571bf309d208c8e019c879c2842ef01a59b196d
  Available to borrow: 3.2 DAI
  Called approveBorrower at https://goerli.arbiscan.io/tx/0x03843a63512ba2f9cdad29043ea0522bc3e5e59da01da9b7f32ae4b726892a2d
  Debt transfer is approved

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
  $ ra-protocol debt transfer request -c ethereum|arbitrum|avalanche --loan <value> [-m]

FLAGS
  -c, --chain=(ethereum|arbitrum|avalanche)  (required) specify which chain
  -m, --mainnet                              specify to run on mainnet
  --loan=<value>                             (required) loan address

DESCRIPTION
  Send debt transfer request to a user

EXAMPLES
  $ ra-protocol debt transfer request --chain arbitrum --loan 0x0B39CBc3AE31f999d0418fc7FF0D4817A943B898
  Using wallet 0xC443c9515916Cb698a2628A63C252BADf84BC961 on network arbitrum testnet
  Contract deployed at https://goerli.arbiscan.io/address/0xe70Dc260ecD3e333E85B7fC3E5aa826E4935bfd8
  {
    transferRequest: { loan: '0x0B39CBc3AE31f999d0418fc7FF0D4817A943B898', sent: true }
  }
  Request is sent

FLAG DESCRIPTIONS
  -c, --chain=(ethereum|arbitrum|avalanche)

        ethereum: Ethereum (Goerli for testnet)
        arbitrum: Arbitrum One (Arbitrum Goerli for testnet)
        avalanche: Avalanche C-Chain (Fuji for testnet)

  -m, --mainnet  

    specify to run on mainnet

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
  $ ra-protocol quickflash --chain ethereum --asset DAI --asset USDC --amount 1000000000000000000
  Using wallet 0x85b4BCB925E5EBDe5d8509Fc22F0A850E03470dA on network ethereum testnet
  Contract deployed at https://goerli.etherscan.io/address/0xab81938A2Cce68e455cbB5c27C2010a4f7B1ffb5
  Called setTokenAddresses at https://goerli.etherscan.io/tx/0x431d534a4f04f6ffd1d9a06ed61e3d0ea06882fefc7cccaccc1c98d3c4f6f687
  Called flashloan at https://goerli.etherscan.io/tx/0x3147a6030f188b50850f01417788090a22674dc65ce48332d56d465fb49c0ad1
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

_See code: [dist/commands/quickflash/index.ts](https://github.com/Ra-Protocol/ra-protocol/blob/v0.12.3/dist/commands/quickflash/index.ts)_
<!-- commandsstop -->
