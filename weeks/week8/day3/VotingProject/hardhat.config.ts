import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
      hardhat: {
        chainId: 31337
      },
      sepolia: {
          url: "https://sepolia.infura.io/v3/a19cc6549e95446db6d8e58fc3eed3fe",
          accounts: [process.env.PRIVATE_KEY || ""]
      }
  }
};

export default config;