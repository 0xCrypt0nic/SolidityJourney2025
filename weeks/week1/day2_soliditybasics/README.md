# Week 1, Day 2: Solidity Basics and Hardhat Setup (16 August 2025)

**Objective**: Dive into the fundamentals of Solidity using an interactive learning platform and set up a development environment with Hardhat and MetaMask to prepare for Ethereum smart contract development. This day is designed for beginners in Node.js and Solidity, with step-by-step guidance to ensure success.

**Total Estimated Time**: 4 hours (split into morning and afternoon sessions)  
**Prerequisites**: Basic programming knowledge (C#, JavaScript), a recent Node.js refresher (completed on 12 August 2025), and a GitHub repository (`SolidityJourney2025`). A computer with a browser (for CryptoZombies) and a terminal (for Hardhat) is required.  
**Tools Needed**: Node.js (version 18+), Hardhat, MetaMask, GitHub account.  
**Note**: This detailed plan is tailored for a novice, with simplified tasks, beginner-friendly resources, and clear instructions to build confidence.

---

## First Session: Introduction to Solidity Basics

**Goal**: Learn the core concepts of Solidity through interactive exercises, focusing on smart contract structure and basic data types.

### Tasks

1. **Access CryptoZombies**:

   - Go to [CryptoZombies](https://cryptozombies.io/) and create an account (or log in if already created).
   - Navigate to the "Solidity Basics" course and start Lesson 1.
   - Tip: Use Chrome for the best experience, and keep a notepad or text editor open for notes.

2. **Complete Lesson 1: Introduction to Smart Contracts**:

   - Follow Lesson 1, which covers:
     - **Pragma**: The `pragma solidity ^0.8.0;` directive to specify the Solidity version.
     - **Contract Structure**: How to define a contract (e.g., `contract MyContract {}`).
     - **Functions**: Writing basic functions.
   - Complete the interactive coding exercises in the browser (e.g., creating a simple contract).
   - Expected outcome: Understand what a smart contract is and write a basic one in CryptoZombies.

3. **Complete Lesson 2: Data Types and State Variables**:

   - Follow Lesson 2, focusing on:
     - **Data Types**: `uint` (unsigned integers), `string`, `address`.
     - **State Variables**: Variables stored on the blockchain (e.g., `uint myNumber = 42;`).
   - Complete the exercises, which involve creating variables and simple functions to manipulate them.
   - Expected outcome: Create a contract with state variables and understand their role.

4. **Take Notes in Markdown**:
   - Open a text editor (e.g., VS Code) and create `/week1/notes/solidity-basics.md` in your `SolidityJourney2025` repository.
   - Write brief notes (in English for GitHub visibility):
     - What is a smart contract? (A program stored on the blockchain, executed automatically.)
     - Key differences with C# (e.g., no classes, blockchain storage, static typing).
     - Examples of data types and their syntax (e.g., `uint`, `string`).
   - Example note structure:
     ```
     # Solidity Basics Notes
     - **Smart Contract**: Code on the blockchain, runs when called.
     - **Data Types**: `uint` for numbers, `string` for text, `address` for Ethereum accounts.
     - **Compared to C#**: No object-oriented classes, focused on blockchain state.
     ```

**Resources**:

- [CryptoZombies - Solidity Basics](https://cryptozombies.io/en/course) (free, interactive, beginner-friendly).
- [DappUniversity Solidity Tutorial for Beginners](https://www.dappuniversity.com/articles/solidity-tutorial) (video for visual learners, free).
- [Solidity by Example - First App](https://solidity-by-example.org/first-app/) (simple reference).

**Livrable**:

- Completed Lessons 1-2 in CryptoZombies.
- Markdown file `/week1/notes/solidity-basics.md` with notes on smart contracts and data types.

---

## Second Session: Setting Up Hardhat and MetaMask

**Goal**: Configure a development environment for Ethereum smart contracts using Hardhat and MetaMask, leveraging your recent Node.js knowledge.

### Tasks

1. **Verify Node.js Installation**:

   - Open a terminal (e.g., Command Prompt, Terminal, or VS Code integrated terminal).
   - Run `node -v` and `npm -v` to confirm Node.js (version 18+) and npm are installed (from your refresher on 12 August).
   - If not installed, download from [nodejs.org](https://nodejs.org/en/) and follow the installation prompts.
   - Tip: If you hit issues, revisit [freeCodeCamp Node.js](https://www.freecodecamp.org/news/node-js-tutorial-for-beginners/).

2. **Install Hardhat**:

   - In your terminal, install Hardhat globally: `npm install --global hardhat`.
   - Create a new project directory:
     - Run `mkdir blockchain-training && cd blockchain-training`.
     - Initialize a Node.js project: `npm init -y` (creates `package.json`).
   - Set up Hardhat:
     - Run `npx hardhat` in the `blockchain-training` directory.
     - Select **"Create a basic sample project"** when prompted (this sets up a simple JavaScript project with an example contract).
     - Follow the prompts to install dependencies (e.g., `npm install` if prompted).
   - Expected outcome: A project folder with `contracts/`, `scripts/`, and `hardhat.config.js`.

3. **Test Hardhat Setup**:
   - Navigate to the `contracts/` folder and open `Lock.sol` (the example contract created by Hardhat).
   - Compile the contract: Run `npx hardhat compile` in the terminal.
   - Check for a successful compilation (look for an `artifacts/` folder and no errors in the terminal).
   - If errors occur (e.g., missing dependencies), run `npm install` again or check [Hardhat Troubleshooting](https://hardhat.org/hardhat-runner/docs/troubleshooting).
   
4. **Install and Configure MetaMask**:
   - Install the [MetaMask](https://metamask.io/) browser extension (Chrome/Firefox recommended).
   - Create a new wallet:
     - Follow the setup wizard and securely save your recovery phrase (write it down offline, never share it).
   - Add the Sepolia Testnet on your Metamask :
     - Visit [Chainlist.org](https://chainlist.org/).
     - Check "Include Testnets" checkbox and search "Sepolia Ethereum Testnet".
   - Get test ETH:
     - Visit [Google Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
     - Enter your MetaMask wallet address to request test ETH (may take a few minutes).
     - Confirm you have 0.05 ETH in MetaMask. (0.05 every 24h)