import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const MINATO_PRIVATE_KEY = process.env.MINATO_PRIVATE_KEY ?? "";
const API_KEY = process.env.ETHERSCAN_API_KEY ?? "";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    minato: {
      url: "https://rpc.minato.soneium.org",
      accounts: [MINATO_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      minato: API_KEY,
    },
    customChains: [
      {
        network: "minato",
        chainId: 1946,
        urls: {
          apiURL: "https://explorer-testnet.soneium.org/api",
          browserURL: "https://explorer-testnet.soneium.org/",
        },
      },
    ],
  },
};

console.log("Private Key:", MINATO_PRIVATE_KEY); // Use this for testing in your config

export default config;
