require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');
require('hardhat-gas-reporter');
require('dotenv').config();

require('./tasks/block-number');

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  etherscan: { apiKey: ETHERSCAN_API_KEY },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
