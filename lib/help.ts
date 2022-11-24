const {readFileSync} = require('fs')
const {join} = require('path')
const {dim} = require('chalk')
const {Help, CommandHelp} = require('@oclif/core')

const optionDescriptions = {
  chain: {
    ethereum: 'Ethereum',
    bsc: 'Binance Smart Chain',
    avalanche: 'Avalanche',
    solana: 'Solana',
  },
  from: {
    eao: 'From your EOA',
    sep: 'From a separate contract',
    this: 'From the same contract',
  },
  type: {
    arb: 'Basic arbitrage flash loan layout',
    liquidate: 'Basic liquidation flash loan',
    'collateral-swap': 'Collateral swap flash loan',
    eipfl: 'EIP-3156 interface flash loan',
    multiasset: 'Multi-asset flash loan',
    custom: 'Custom logic',
  },
}

const optionDescriptionsExtended = {
  type: {
    arb: 'This will call an iteration of flashloanSimple, which calls makeArbitrage, swapping the flashloaned token for another token using one swap router, and then swapping back to the original token using another swap router',
    liquidate: 'This will call an iteration of flashloanSimple, which calls makeArbitrage, adding the flashloaned tokens as well as tokens within our contract balance as liquidity on a token pair (AKA liquidity pool), and then removing the same amount of liquidity',
    multiasset: 'This will call an iteration of flashloan, which borrows more than 1 token, which can then be swapped, added as liquidity, etc. as long as all borrowed token amounts are paid back at the end',
  },
}

class MyCommandHelpClass extends CommandHelp {
  flags(flags) {
    if (flags.length === 0) return

    return flags.map(flag => {
      const left = this.flagHelpLabel(flag)

      let right = flag.summary || flag.description || ''
      if (flag.type === 'option' && flag.default) {
        right = `[default: ${flag.default}] ${right}`
      }

      if (flag.required) right = `(required) ${right}`

      if (flag.type === 'option' && flag.options && !flag.helpValue && !this.opts.showFlagOptionsInTitle) {
        if (flag.optionDescriptions) {
          right += `\n<options: ${Object.keys(flag.optionDescriptions).join('|')}>`
        } else {
          right += `\n<options: ${flag.options.join('|')}>`
        }
      }

      return [left, dim(right.trim())]
    })
  }

  flagsDescriptions(flags) {
    const flagsWithExtendedDescriptions = flags
    if (flagsWithExtendedDescriptions.length === 0) return

    const body = flagsWithExtendedDescriptions.map(flag => {
      if (Object.keys(optionDescriptions).includes(flag.name)) {
        let summary = []
        for (const i of Object.keys(optionDescriptions[flag.name])) {
          if (Object.keys(optionDescriptionsExtended).includes(flag.name) && Object.keys(optionDescriptionsExtended[flag.name]).includes(i)) {
            // summary.push(this.indent(`${i}: ${optionDescriptions[flag.name][i]}`, 6) + '\n' + this.indent(`${optionDescriptionsExtended[flag.name][i]}`, 8 + i.length))
            summary.push(this.indent(`${i}: ${optionDescriptions[flag.name][i]}`, 6) + '\n' + this.indent(this.wrap(`${optionDescriptionsExtended[flag.name][i]}`, (8 + i.length) * 2), 8 + i.length) + '\n')
          } else {
            summary.push(this.indent(`${i}: ${optionDescriptions[flag.name][i]}`, 6))
          }
        }
        return `${this.flagHelpLabel(flag, true)}\n\n${summary.join('\n')}`
      }

      const summary = flag.summary || ''
      let flagHelp = this.flagHelpLabel(flag, true)
      flagHelp += flagHelp.length + summary.length + 2 < this.opts.maxWidth ? '  ' + summary : '\n\n' + this.indent(this.wrap(summary, this.indentSpacing * 2))
      return `${flagHelp}\n\n${this.indent(this.wrap(flag.description || '', this.indentSpacing * 2))}`
    }).join('\n\n')

    return body
  }
}

module.exports = class MyHelpClass extends Help {
  CommandHelpClass = MyCommandHelpClass
  showRootHelp() {
    this.log(readFileSync(join(__dirname, 'logo.ans'), 'utf8'))
    super.showRootHelp()
  }
}
