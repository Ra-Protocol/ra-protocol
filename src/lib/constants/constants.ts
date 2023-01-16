import {environment} from '../environment'

type stringTree2levels = { [key: string]: { [key: string]: string } }
type stringTree3levels = { [key: string]: { [key: string]: { [key: string]: string } } }

export type constructorParams2levels = { [key: string]: { [key: string]: string[] } }
export type constructorParams3levels = { [key: string]: { [key: string]: { [key: string]: string[] } } }

export const getArbFactoryAddress = (env: environment) => {
  const address: stringTree2levels = {
    ethereum: {
      testnet: '0xB566e1d4B2161Baf85d61FFE119F2F7d93D5ff9E',
    },
    avalanche: {
      testnet: '0x2AbA532f841Ff89879b6AA3C52ACd068FF0d92C4',
    },
  }
  return address[env.network.slug][env.network.type]
}

export const getBorrowerFactoryAddress = (env: environment) => {
  const address: stringTree3levels = {
    ethereum: {
      v2: {
        testnet: '0xB566e1d4B2161Baf85d61FFE119F2F7d93D5ff9E',
      },
      v3: {
        testnet: '0xB566e1d4B2161Baf85d61FFE119F2F7d93D5ff9E',
      },
    },
    arbitrum: {
      v2: {
        testnet: '0x577E72c8ca63F93D283379F2C741C79a2cCe0959',
      },
      v3: {
        testnet: '0xfb7BeB790d55f36FFfeeC4AACaA757F5B28A46d2',
      },
    },
    avalanche: {
      v2: {
        testnet: '0xb9352dB543FE0d583CEc8A54737A54dE06781E93',
      },
      v3: {
        testnet: '0x6c8704B513b67E12F38c0d8036EfA1b8819f2563',
      },
    },
  }
  return address[env.network.slug][env.network.protocols.aave][env.network.type]
}

export const getDelegatorDebtTransferFactoryAddress = (env: environment) => {
  const address: stringTree3levels = {
    ethereum: {
      v2: {
        testnet: '0xF8a804eD886517aEE5B82ec3d3a9AFE5ef9A64ac',
      },
      v3: {
        testnet: '0xC5496718Fe8Bf595d016842f6F08836d011Da248',
      },
    },
    arbitrum: {
      v2: {
        testnet: '0xcC6FC2669DEEe32630A3F50D5D290E82A75C083A',
      },
      v3: {
        testnet: '0xF936B0dFDb9021b72B444a72abFDe39cC5508313',
      },
    },
    avalanche: {
      v2: {
        testnet: '0x0e0D4A6f4Db82E14fD5FD8E401C7A47f60eda8ec',
      },
      v3: {
        testnet: '0xb9680017ECc4266C15d818B199E22AAF922cD3c8',
      },
    },
  }
  return address[env.network.slug][env.network.protocols.aave][env.network.type]
}

export const getDelegatorFactoryAddress = (env: environment) => {
  const address: stringTree2levels = {
    ethereum: {
      testnet: '0x4a85Db8996514eDE8001337056095537AC8D23dc',
    },
    arbitrum: {
      testnet: '0x91722c6008EeC8bd5b685794aCa362337a60Ce4A',
    },
    avalanche: {
      testnet: '0xCfFbbF36c1E8fe2E880575cC9cB23A94Ae295b07',
    },
  }
  return address[env.network.slug][env.network.type]
}

export const getNetworks: (env: environment) => { [key: string]: { [key: string]: {
      rpc: string,
      explorer: string,
      networkId: number
} } } = (env: environment) => {
  return {
    arbitrum: {
      mainnet: {
        rpc: 'https://arb1.arbitrum.io/rpc',
        explorer: 'https://arbiscan.io',
        networkId: 42_161,
      },
      testnet: {
        rpc: 'https://goerli-rollup.arbitrum.io/rpc',
        explorer: 'https://goerli.arbiscan.io',
        networkId: 421_613,
      },
    },
    avalanche: {
      mainnet: {
        rpc: 'https://api.avax.network/ext/bc/C/rpc',
        explorer: 'https://snowtrace.io',
        networkId: 43_114,
      },
      testnet: {
        rpc: 'https://api.avax-test.network/ext/bc/C/rpc',
        explorer: 'https://testnet.snowtrace.io',
        networkId: 43_113,
      },
    },
    ethereum: {
      mainnet: {
        rpc: `https://mainnet.infura.io/v3/${env.globalFlags['infura-key']}`,
        explorer: 'https://etherscan.io',
        networkId: 1,
      },
      testnet: {
        rpc: `https://goerli.infura.io/v3/${env.globalFlags['infura-key']}`,
        explorer: 'https://goerli.etherscan.io',
        networkId: 5,
      },
    },
  }
}

export const decimals = (symbol: string) => {
  const decimals: { [key: string]: number } = {
    EURS: 2,
    USDT: 6,
    USDC: 6,
    WBTC: 8,
  }
  if (Object.keys(decimals).includes(symbol)) return decimals[symbol]
  return 18
}

export const coins: { [key: string]: string[] } = {
  ETH: ['arbitrum', 'ethereum'],
  AVAX: ['avalanche'],
}

export const tokens: { [key: string]: { [key: string]: { [key: string]: {[key: string]: string} } } } = {
  arbitrum: {
    mainnet: {
      v3: {
        DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        EURS: '0xD22a58f79e9481D1a88e00c343885A588b34b68B',
        USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        AAVE: '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196',
        LINK: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
        WBTC: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      },
    },
    testnet: {
      v3: {
        DAI: '0x7e752bC77eBE2225B327e6ebF09fAD7801873931',
        EURS: '0x569275a32682aBD8dE2eD68Dc7443724a8aD8660',
        USDC: '0x6775842AE82BF2F0f987b10526768Ad89d79536E',
        USDT: '0xbAc565f93f3192D35E9106E67B9d5c9348bD9389',
        AAVE: '0x805aC2a202e3E217B0C9fe53908ea5e36856fD29',
        LINK: '0xD0fbc05a6B234b2a6a9D65389C2ffd93Fef0527e',
        WBTC: '0x2Df743730160059c50c6bA9E87b30876FA6Db720',
        WETH: '0xCDa739D69067333974cD73A722aB92E5e0ad8a4F',
      },
    },
  },
  avalanche: {
    mainnet: {
      v2: {
        WETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
        DAI: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
        USDT: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
        USDC: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
        AAVE: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
        WBTC: '0x50b7545627a5162F82A992c33b87aDc75187B218',
        WAVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      },
      v3: {
        DAI: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
        FRAX: '0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64',
        MAI: '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b',
        USDC: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        USDT: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
        AAVE: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
        LINK: '0x5947BB275c521040051D82396192181b413227A3',
        WAVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        WBTC: '0x50b7545627a5162F82A992c33b87aDc75187B218',
        WETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
      },
    },
    testnet: {
      v2: {
        WETH: '0x9668f5f55f2712Dd2dfa316256609b516292D554',
        DAI: '0x51BC2DfB9D12d9dB50C855A5330fBA0faF761D15',
        USDT: '0x02823f9B469960Bb3b1de0B3746D4b95B7E35543',
        AAVE: '0x47183584aCbc1C45608d7B61cce1C562Ee180E7e',
        WBTC: '0x9C1DCacB57ADa1E9e2D3a8280B7cfC7EB936186F',
        WAVAX: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
      },
      v3: {
        WAVAX: '0x407287b03D1167593AF113d32093942be13A535f',
        DAI: '0xFc7215C9498Fc12b22Bc0ed335871Db4315f03d3',
        LINK: '0x73b4C0C45bfB90FC44D9013FA213eF2C2d908D0A',
        USDC: '0x3E937B4881CBd500d05EeDAB7BA203f2b7B3f74f',
        WBTC: '0x09C85Ef96e93f0ae892561052B48AE9DB29F2458',
        WETH: '0x28A8E6e41F84e62284970E4bc0867cEe2AAd0DA4',
        USDT: '0xD90db1ca5A6e9873BCD9B0279AE038272b656728',
        AAVE: '0xCcbBaf8D40a5C34bf1c836e8dD33c7B7646706C5',
      },
    },
  },
  ethereum: {
    mainnet: {
      v2: {
        WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        AAVE: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      },
    },
    testnet: {
      v2: {
        WETH: '0xCCa7d1416518D095E729904aAeA087dBA749A4dC',
        DAI: '0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33',
        LINK: '0x7337e7FF9abc45c0e43f130C136a072F4794d40b',
        USDC: '0x9FD21bE27A2B059a288229361E2fA632D8D2d074',
        WBTC: '0xf4423F4152966eBb106261740da907662A3569C5',
        USDT: '0x65E2fe35C30eC218b46266F89847c63c2eDa7Dc7',
        AAVE: '0x0B7a69d978DdA361Db5356D4Bd0206496aFbDD96',
      },
      v3: {
        WETH: '0x2e3A2fb8473316A02b8A297B982498E661E1f6f5',
        DAI: '0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464',
        LINK: '0x07C725d58437504CA5f814AE406e70E21C5e8e9e',
        USDC: '0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43',
        WBTC: '0x8869DFd060c682675c2A8aE5B21F2cF738A0E3CE',
        USDT: '0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49',
        AAVE: '0x63242B9Bd3C22f18706d5c4E627B4735973f1f07',
        EURS: '0xaA63E0C86b531E2eDFE9F91F6436dF20C301963D',
      },
    },
  },
}
