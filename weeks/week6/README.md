# Week 6 Program: Building a Token Contract

**Objective**: Learn the ERC-20 token standard, create a custom ERC-20 token using OpenZeppelin, deploy it on Sepolia, and test its functionality, building on Week 5’s error handling and security practices.

**Total Estimated Time**: 8-10 hours  
**Prerequisites**: Completion of Week 5 (error handling, security). Familiarity with Remix, Hardhat (TypeScript setup), MetaMask, Sepolia deployment, and OpenZeppelin basics. A computer with Node.js (version 18+), Hardhat, MetaMask, Remix IDE, and GitHub repository (`SolidityJourney2025`).  
**Tools Needed**: Hardhat (TypeScript), Remix IDE, MetaMask, Sepolia test network, GitHub, VS Code (recommended for TypeScript editing).  
**Note**: All Hardhat scripts and tests use TypeScript for type safety. Ensure your Hardhat project is initialized with TypeScript (`npx hardhat init`, select TypeScript). Install dependencies if needed:

```
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-ethers ethers @types/node ts-node typescript chai @types/chai @types/mocha @typechain/hardhat typechain dotenv @openzeppelin/contracts
```

Verify `.env` is in `.gitignore` to protect `PRIVATE_KEY`.

---

## Day 1: Study the ERC-20 Token Standard via OpenZeppelin

**Objective**: Understand the ERC-20 token standard, its functions, and events using OpenZeppelin’s documentation and examples.

**Resources**:

- [OpenZeppelin - ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20) (ERC-20 documentation).
- [Solidity by Example - ERC20](https://solidity-by-example.org/app/erc20/) (basic implementation).
- [EIP-20: ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20) (official standard).

---

## Day 2: Create a Basic ERC-20 Token Contract in Remix

**Objective**: Build and deploy a custom ERC-20 token using OpenZeppelin in Remix, testing core functionality.

**Resources**:

- [OpenZeppelin - ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20) (ERC-20 documentation).
- [Remix IDE - Import OpenZeppelin](https://remix-ide.readthedocs.io/en/latest/import.html) (importing contracts).
- [Sepolia Etherscan](https://sepolia.etherscan.io/) (verify deployment).

---

## Day 3: Test and Document the Token Contract

**Objective**: Write comprehensive Hardhat tests for `GrokToken.sol` in TypeScript, deploy it, and finalize Week 6 documentation.

**Resources**:

- [OpenZeppelin - ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20) (ERC-20 documentation).
- [Hardhat - TypeScript Support](https://v2.hardhat.org/hardhat-runner/docs/guides/typescript) (TypeScript testing).
- [Hardhat - Testing Contracts](https://v2.hardhat.org/hardhat-runner/docs/guides/test-contracts).
- [EIP-20: ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20).
- [Sepolia Etherscan](https://sepolia.etherscan.io/).
