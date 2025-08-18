# Week 1, Day 3: First Smart Contract and Solidity Visibility 📝

**Objective**: Write and deploy a simple smart contract using Remix IDE and learn about Solidity data types and visibility modifiers. This day builds on my Node.js and Solidity basics as a beginner, preparing me to interact with the Ethereum blockchain and understand key Solidity concepts.

**Total Estimated Time**: 3-4 hours
**Prerequisites**: Basic programming knowledge (C#, JavaScript), Node.js refresher (Day 1), Solidity basics (Day 2 morning), and Hardhat/MetaMask setup (Day 2). A computer with a browser (for Remix) and MetaMask installed with test ETH on Sepolia.
**Tools Needed**: Remix IDE, MetaMask, GitHub account, Sepolia test network.  
**Note**: This plan is tailored for a Solidity novice, with detailed steps, beginner-friendly resources, and troubleshooting tips to ensure success.

---

## Session 1 - First Smart Contract with Remix

**Goal**: Write, compile, and deploy a simple smart contract on the Sepolia test network using Remix IDE, learning the basics of contract interaction.

### Tasks

1.  **Open Remix IDE**:

    - Navigate to [Remix IDE](https://remix.ethereum.org/) in your browser (Chrome/Firefox recommended).
    - Ensure MetaMask is installed and connected to the Sepolia test network with test ETH (from Day 2).
    - Create a new file in Remix: Click the "File Explorer" tab, then "Create New File" and name it `Counter.sol`.

2.  **Write the Counter Smart Contract**:

    - Copy and paste the following Solidity code into `Counter.sol`:

      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;

      contract Counter {
      uint256 public count;

          function increment() public {
              count += 1;
          }

          function decrement() public {
              count -= 1;
          }

          function getCount() public view returns (uint256) {
              return count;
          }

      }

    - Understand the code:
      - `uint256 public count`: A state variable to store a number on the blockchain.
      - `increment()`: Increases `count` by 1.
      - `decrement()`: Decreases `count` by 1.
      - `getCount()`: Returns the current `count` value without modifying the blockchain (`view`).
    - Tip: Save the file frequently (Ctrl+S or Cmd+S).

3.  **Compile the Contract**:

    - Go to the "Solidity Compiler" tab in Remix (left sidebar, hammer icon).
    - Select compiler version `0.8.x` (matching the `pragma` in the code).
    - Click "Compile Counter.sol".
    - Check for a green checkmark indicating successful compilation. If errors occur, ensure the code is exact or check for typos.

4.  **Deploy the Contract on Sepolia**:

    - Go to the "Deploy & Run Transactions" tab (left sidebar, play icon).
    - In the "Environment" dropdown, select "Injected Provider - MetaMask".
    - MetaMask should prompt you to connect; select your Sepolia wallet.
    - Ensure you have at least 0.01 ETH on Sepolia.
    - Select `Counter` in the contract dropdown and click "Deploy".
    - Approve the transaction in MetaMask (gas fees apply, paid in test ETH).
    - Once deployed, find the contract address in Remix’s "Deployed Contracts" section.
    - Test the contract:
      - Click `increment` and approve in MetaMask (check if `count` increases).
      - Click `decrement` and verify the change.
      - Call `getCount` (no gas fee, as it’s `view`) to see the current `count`.
    - Take a screenshot of the deployment (Remix’s "Deployed Contracts" section) or MetaMask transaction confirmation.

5.  **Document the Process**:
    - Create a Markdown file `/week1/contracts/Counter_README.md` in your `SolidityJourney2025` repository.
    - Write a brief summary (in English for GitHub visibility):
      - Steps to write and deploy the contract.
      - Outcome of testing `increment`, `decrement`, and `getCount`.
      - Include the contract address from Remix.
    - Example:
      ```
      # Counter.sol Deployment
      - Wrote a `Counter.sol` smart contract in Remix IDE.
      - Compiled with Solidity version 0.8.x.
      - Deployed on Sepolia test network via MetaMask (address: 0x...).
      - Tested `increment`, `decrement`, and `getCount` functions successfully.
      ```

**Resources**:

- [Remix IDE - Quick Start](https://remix-ide.readthedocs.io/en/latest/create_deploy.html) (beginner-friendly guide).
- [DappUniversity - Deploy Smart Contract](https://www.dappuniversity.com/articles/how-to-deploy-a-smart-contract) (video with deployment steps).

**Livrable**:

- `Counter.sol` deployed on Sepolia.
- Note file `/week1/notes/Counter.md`.
