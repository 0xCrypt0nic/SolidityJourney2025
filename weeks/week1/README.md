# Week 1 Program: Node.js Refresher, Solidity Basics, and Environment Setup (11-17 August 2025)

**Objective**: Kickstart your journey to become a blockchain developer by refreshing Node.js basics, learning Solidity fundamentals, and setting up an Ethereum development environment. This week is tailored for beginners in Node.js and Solidity, using accessible tools and step-by-step guidance.

**Total Estimated Time**: 9-10 hours (over 3 days)  
**Prerequisites**: Basic programming knowledge (e.g., C#, JavaScript), a recent Node.js refresher, and familiarity with Git. A computer with a browser (for Remix) and a terminal is required.  
**Tools Needed**: Node.js (version 18+), Hardhat, Remix IDE, MetaMask, GitHub account.  
**Note**: This program accounts for your novice level in Node.js and Solidity, with an extra day for Node.js review and simplified Solidity tasks.

---

## Day 1: Node.js Basics Refresher

**Objective**: Reinforce Node.js fundamentals to prepare for blockchain tools like Hardhat.

- **Tasks**:
  1. Watch the [Node JS Tutorial For Beginners 2025](https://www.youtube.com/watch?v=yGl3f0xTl_0) (2h30) from GreatStack:
     - Covers Node.js installation, running scripts, modules, npm, and basic server creation.
     - Follow along by installing Node.js (if not already done) and running the example scripts in a terminal.
  2. Practice by creating a simple script (e.g., a "Hello World" server using the `http` module) (30 min).
  3. Take brief notes in Markdown on key concepts (e.g., npm, modules).
- **Resources**:
  - [Node JS Tutorial For Beginners 2025](https://www.youtube.com/watch?v=yGl3f0xTl_0) (Perfect video from GreatStack).
  - [Node.js Official Docs - Getting Started](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) (For reference).
  - [NodeJS Cheatsheet](https://github.com/LeCoupa/awesome-cheatsheets/blob/master/backend/node.js) Writed by LeCoupa ([Github](https://github.com/LeCoupa)).

---

## Day 2: Solidity Basics and Hardhat Setup

**Objective**: Learn Solidity fundamentals and configure the development environment.

### Introduction to Solidity Basics

- **Tasks**:
  1. Access [CryptoZombies](https://cryptozombies.io/) and create an account if needed.
  2. Complete Lessons 1-2 of "Solidity Basics":
     - Lesson 1: Introduction to smart contracts (pragma, contract structure, functions).
     - Lesson 2: Data types (uint, string, address) and state variables.
  3. Work through the interactive coding exercises in CryptoZombies.
  4. Take simple notes in Markdown on:
     - What is a smart contract?
     - Key differences with languages like C# (e.g., static types, no classes).
- **Resources**:
  - [CryptoZombies - Solidity Basics](https://cryptozombies.io/en/course) (free, beginner-friendly).
  - [DappUniversity Solidity Tutorial for Beginners](https://www.dappuniversity.com/articles/solidity-tutorial) (simple video).

### Setting Up Hardhat and MetaMask

- **Tasks**:
  1. Ensure Node.js (version 18+) is installed (from your refresher).
  2. Install Hardhat:
     - Run `npm install --global hardhat` in a terminal.
     - Create a project: `mkdir blockchain-training && cd blockchain-training && npm init -y`.
     - Run `npx hardhat` and select "Create a basic sample project".
  3. Test the setup by compiling the example contract (Lock.sol) with `npx hardhat compile`.
  4. Install [MetaMask](https://metamask.io/) browser extension:
     - Create a wallet and securely save the recovery phrase.
     - Configure the Sepolia test network.
     - Get test ETH from [Google Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia).
- **Resources**:
  - [Hardhat - Getting Started](https://hardhat.org/hardhat-runner/docs/getting-started) (Quick Start section).
  - [MetaMask - Getting Started](https://docs.metamask.io/guide/getting-started.html).
