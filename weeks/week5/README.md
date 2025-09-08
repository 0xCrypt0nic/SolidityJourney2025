# Week 5 Program: Error Handling and Security

**Objective**: Master Solidity error handling (`require`, `assert`, `revert`) and basic security practices to build robust contracts, building on Week 4’s inheritance and libraries.

**Total Estimated Time**: 8-10 hours  
**Prerequisites**: Completion of Week 4 (inheritance, interfaces, libraries). Familiarity with Remix, Hardhat (TypeScript setup), MetaMask, and Sepolia deployment. A computer with Node.js (version 18+), Hardhat, MetaMask, Remix IDE, and GitHub repository (`SolidityJourney2025`).  
**Tools Needed**: Hardhat (TypeScript), Remix IDE, MetaMask, Sepolia test network, GitHub, VS Code (recommended for TypeScript).  
**Note**: All Hardhat scripts and tests use TypeScript for type safety. Ensure your Hardhat project is initialized with TypeScript (`npx hardhat init`, select TypeScript). Install dependencies if needed:

```
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-ethers ethers @types/node ts-node typescript chai @types/chai @types/mocha @typechain/hardhat typechain dotenv
```

Verify `.env` is in `.gitignore` to protect `PRIVATE_KEY`.

---

## Day 1: Learn Error Handling with `require`, `assert`, and `revert`

**Objective**: Understand Solidity error handling mechanisms using Solidity by Example and documentation, implementing checks in a sample contract.

**Resources**:

- [Solidity by Example - Error](https://solidity-by-example.org/error/) (practical examples).
- [Solidity - Error Handling](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions) (official documentation).
- [Remix IDE - Deploy](https://remix-ide.readthedocs.io/en/latest/create_deploy.html) (deployment guide).
- [Ethereum - Gas and Fees](https://ethereum.org/en/developers/docs/gas/) (gas implications of errors).

---

## Day 2: Implement Error Handling in a Contract and Test

**Objective**: Build a contract with robust error handling and test it with Hardhat (TypeScript) to ensure correct behavior.

**Resources**:

- [Solidity by Example - Error](https://solidity-by-example.org/error/) (advanced examples).
- [Solidity - Error Handling](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions).
- [Hardhat - TypeScript Support](https://v2.hardhat.org/hardhat-runner/docs/guides/typescript) (TypeScript testing guide).
- [Hardhat - Testing Contracts](https://v2.hardhat.org/hardhat-runner/docs/guides/test-contracts).
- [Sepolia Etherscan](https://sepolia.etherscan.io/) (verify deployment).

---

## Day 3: Document Common Security Pitfalls and Mitigations

**Objective**: Identify common smart contract vulnerabilities, audit the `Bank.sol` contract, and document mitigations.

**Resources**:

- [OpenZeppelin - Security](https://docs.openzeppelin.com/contracts/4.x/api/security) (security best practices).
- [Solidity - Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html) (vulnerability guide).
- [Solidity by Example - Reentrancy](https://solidity-by-example.org/hacks/re-entrancy/) (reentrancy example).
- [Hardhat - TypeScript Support](https://v2.hardhat.org/hardhat-runner/docs/guides/typescript).
- [Sepolia Etherscan](https://sepolia.etherscan.io/).