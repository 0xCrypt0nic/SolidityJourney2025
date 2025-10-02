## Week8, Day 3: Test and Document the Frontend Setup

**Goal**: Test the frontend with Hardhat’s local network, deploy it, and finalize Week 8 documentation.

### Hardhat Local Network Testing

**Setup Local Hardhat Network**:

- Update `hardhat.config.ts` to include local network:

  ```
  import { HardhatUserConfig } from "hardhat/config";
  import "@nomicfoundation/hardhat-toolbox";
  import "@typechain/hardhat";
  import * as dotenv from "dotenv";

  dotenv.config();

  const config: HardhatUserConfig = {
      solidity: "0.8.20",
      networks: {
          hardhat: {
              chainId: 31337
          },
          sepolia: {
              url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
              accounts: [process.env.PRIVATE_KEY || ""]
          }
      }
  };

  export default config;
  ```

**Deploy Voting Contract Locally**:

- Create `/week8/scripts/deploy-voting.ts`:

  ```
  import { ethers } from "hardhat";

  async function main() {
      const Voting = await ethers.getContractFactory("Voting");
      const voting = await Voting.deploy(["Alice", "Bob"]);
      await voting.deployed();
      console.log(`Voting deployed to: ${voting.address}`);
  }

  main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
  });
  ```

- Run: `npx hardhat run scripts/deploy-voting.ts`.
- Note the local address (e.g., `0x5FbDB2315678afecb367f032d93F642f64180aa3`).

**Test Frontend Locally**:

- Update `voting.html` with local address:
  ```
  const votingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // From local deployment
  ```
- Run Hardhat node: `npx hardhat node` (starts local network on http://127.0.0.1:8545).
- Open `voting.html` in a browser, connect MetaMask to Hardhat network (add custom RPC: http://127.0.0.1:8545, Chain ID: 31337, Currency: ETH).
- Test voting and candidate loading.
- Take a screenshot of frontend interacting with local contract.
