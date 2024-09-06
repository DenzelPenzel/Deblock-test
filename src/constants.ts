import type {Token} from "./types";

export const ETHToken: Token = {
  address: '',
  chainId: 8453,
  decimals: 18,
  name: 'Ethereum',
  symbol: 'ETH',
  key: 'ethereum',
  image:
    'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
};

export const USDCToken: Token = {
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chainId: 8453,
  decimals: 6,
  name: 'USDC',
  symbol: 'USDC',
  key: 'usdc',
  image:
    'https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png',
};

export const WBTCToken: Token = {
  address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  chainId: 8453,
  decimals: 8,
  name: 'Wrapped Bitcoin',
  symbol: 'WBTC',
  key: 'bitcoin',
  image: 'https://dynamic-assets.coinbase.com/51bfc85a5a881014b4558bbe8f9758c354a0c831208f189286be93b6b0b86b886a3d656cff4122bac435ec97bd54f08a8d198103dcfab6cae8578bbc1c81afc3/asset_icons/bb1ab3b1677110aea1e1ed5a93f4440d229e01b901de963201417861c57d9add.png',
};