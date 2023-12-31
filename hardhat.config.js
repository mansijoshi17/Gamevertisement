require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");


module.exports = {
  networks: {
    hardhat: {}, 
    opbnb: {
      url: "https://opbnb-testnet-rpc.bnbchain.org/",
      chainId: 5611, // Replace with the correct chainId for the "opbnb" network
      accounts: [process.env.NEXT_PUBLIC_APP_PRIVATE_KEY], // Add private keys or mnemonics of accounts to use 
      // accounts: process.env.privateKey, // Add private keys or mnemonics of accounts to use 
      // gasPrice: 40000000000,
      gasPrice: 20000000000,
    },
  }, 
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};