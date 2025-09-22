## Week 6, Day 2: Create a Basic ERC-20 Token Contract in Remix

**Goal**: Build and deploy a custom ERC-20 token using OpenZeppelin in Remix, testing core functionality.

### Practice in Remix

**Create ERC-20 Token Contract**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `GrokToken.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

  contract GrokToken is ERC20 {
      address public owner;

      error Unauthorized(address caller);

      constructor(uint256 initialSupply) ERC20("GrokToken", "GROK") {
          owner = msg.sender;
          _mint(msg.sender, initialSupply * 10 ** decimals());
      }

      function mint(address to, uint256 amount) public {
          if (msg.sender != owner) revert Unauthorized(msg.sender);
          _mint(to, amount * 10 ** decimals());
      }
  }
  ```

- **Key points**:
  - Inherits `ERC20` from OpenZeppelin (import via Remix’s file explorer or GitHub: `https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC20/ERC20.sol`).
  - Constructor sets name ("GrokToken"), symbol ("GROK"), and mints `initialSupply` (scaled by `decimals`, default 18).
  - Adds `mint` function restricted to owner with custom error from Week 5.
- **Compile and Deploy**:
  - Compile with Solidity version 0.8.x (enable optimization for gas efficiency).
  - Deploy on Sepolia via MetaMask with `initialSupply = 1000` (mints 1000 GROK to deployer).
  - Ensure test ETH from [Sepolia Faucet](https://sepoliafaucet.com/).
- **Test in Remix**:
  - Call `totalSupply()` (returns 1000 \* 10^18).
  - Call `balanceOf(deployer_address)` (returns 1000 \* 10^18).
  - Call `transfer(receiver_address, 100 * 10^18)` (transfers 100 GROK).
  - Call `approve(spender_address, 50 * 10^18)` (approves 50 GROK).
  - Call `transferFrom(deployer_address, receiver_address, 50 * 10^18)` from spender (transfers 50 GROK).
  - Call `mint(receiver_address, 200)` from owner (mints 200 GROK).
  - Call `mint` from non-owner (fails with `Unauthorized`).
