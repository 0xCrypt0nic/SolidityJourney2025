## Overview 📝

During the afternoon of Day 2 in my `SolidityJourney2025`, I set up my blockchain development environment using Hardhat and MetaMask. As a Node.js and Solidity beginner, I focused on key commands to initialize and compile a Hardhat project and configure MetaMask for the Sepolia test network. Below are the essential commands I learned and used.

## Commands and Steps 🛠️

### Verifying Node.js Installation

- `node -v`: Checks the Node.js version (confirmed version 18+ is installed).
- `npm -v`: Checks the npm version to ensure package management is ready.

### Initializing a New Hardhat Project

1. **Install Hardhat Globally**:
   - `npm install --global hardhat`: Installs Hardhat as a global npm package for easy access.
2. **Create a Project Directory**:
   - `mkdir blockchain-training && cd blockchain-training`: Creates and navigates to a new project folder.
   - `npm init -y`: Initializes a Node.js project with a default `package.json`.
3. **Set Up Hardhat Project**:
   - `npx hardhat`: Runs Hardhat and prompts to create a project.
   - Selected "Create a basic sample project" (JavaScript) to generate `contracts/`, `scripts/`, and `hardhat.config.js`.

### Compiling a Hardhat Project

- `npx hardhat compile`: Compiles the example `Greeter.sol` contract in the `contracts/` folder.
  - Creates an `artifacts/` folder with compiled outputs if successful.
  - Tip: Run `npm install` if dependencies are missing.
