## Week 3, Day 2: Gas Optimization Techniques

**Goal**: Analyze gas costs in Solidity and optimize a contract to reduce transaction costs using Remix.

### Solidity Documentation - Gas Optimization

**Read Solidity Docs**:

- Read [Solidity - Gas Optimization Tips](https://docs.soliditylang.org/en/latest/internals/optimizer.html) and [Solidity - Best Practices](https://docs.soliditylang.org/en/latest/security-considerations.html#gas-limit-and-loops).
- Key points:
  - **Storage vs. Memory**: Storage (blockchain) is expensive; use `memory` for temporary data.
  - **Loops**: Minimize iterations to reduce gas.
  - **Data Types**: Use smaller types (e.g., `uint8` vs. `uint256`) when possible.
  - **Packing**: Store variables efficiently (e.g., multiple `uint8` in one slot).
- Example of optimization:
  ```
  // Unoptimized
  contract Unoptimized {
      uint256[] public numbers;
      function addNumber(uint256 _number) public {
          numbers.push(_number);
      }
  }
  // Optimized
  contract Optimized {
      uint8[] public numbers;
      function addNumber(uint8 _number) public {
          numbers.push(_number);
      }
  }
  ```

### Practice in Remix

**Analyze and Optimize Counter Contract**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `OptimizedCounter.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract OptimizedCounter {
      uint8 public count; // Use uint8 instead of uint256
      address public owner;

      constructor() {
          owner = msg.sender;
      }

      modifier onlyOwner() {
          require(msg.sender == owner, "Not owner");
          _;
      }

      function increment() public onlyOwner {
          count += 1; // Single operation, no loops
      }

      function getCount() public view returns (uint8) {
          return count;
      }
  }
  ```

- Compile with Solidity version 0.8.x and enable optimizer (in Remix’s Compiler tab, set runs to 200).
- Deploy on Sepolia via MetaMask.
- Test:
  - Call `increment` (owner wallet) and check `getCount` (returns 1, then 2, etc.).
  - Compare gas costs in Remix’s "Gas Estimates" (e.g., `increment` gas cost).
  - Try `increment` from non-owner wallet (fails with "Not owner").
