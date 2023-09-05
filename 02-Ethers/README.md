# Simple Storage

This version of _Simple Storage_ is built with [Ethers.js](https://ethers.org/).<br />

## Ethers.js

Ethers.js is a JavaScript library used for Ethereum blockchain interaction. It enables streamlined development of decentralized applications and smart contracts. With a user-friendly API, it facilitates tasks like transaction management and data querying, suitable for diverse applications like DeFi and NFTs.<br />Ethers.js stands as an essential toolkit for both novice and experienced developers, offering seamless integration with Ethereum's infrastructure. Its versatility and performance empower innovation within the Ethereum ecosystem, making it a cornerstone for building the future of blockchain technology.

## How to use

This project is intended to work seamlessly within [VS Code](https://code.visualstudio.com/) and involves deploying a Smart Contract on a locally running testnet. To establish this testnet, you can download and install [Ganache](https://trufflesuite.com/ganache/). Make sure to create a _.env file_ within the project directory. This file will be used to define the value of `RPC_URL`, which acts as the connection link to the testnet. Make sure to accurately set RPC_URL to point to your locally operational Ganache testnet.<br />
To begin working with the source code, follow run the subsequent commands:

```bash
  yarn install
  yarn compile
  PRIVATE_KEY="..." PRIVATE_KEY_PASSWORD="..." node encryptKey.js
  PRIVATE_KEY_PASSWORD="..." node deploy.js
```

The deployment should be visible in your terminal and in Ganache.
