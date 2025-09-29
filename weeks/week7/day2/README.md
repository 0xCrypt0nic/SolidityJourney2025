## Week7, Day 2: Build a Contract Interacting with the ERC-20 Token

**Goal**: Create a contract that interacts with your ERC-20 token (GrokToken) using interfaces, testing interactions in Remix.

### Solidity Documentation - Advanced Interactions

**Read Solidity Docs**:

- Read [Solidity - Calling Functions](https://docs.soliditylang.org/en/latest/control-structures.html#function-calls) for high-level and low-level calls.
  - Key points: High-level calls use interfaces (safe, type-checked), low-level `call` for dynamic calls (risky, use with caution).
- Read [Solidity - Delegatecall](https://docs.soliditylang.org/en/latest/contracts.html#delegatecall-callcode) for calling in context of current contract.
  - Key points: `delegatecall` executes code in the caller's storage (used for libraries/upgrades).
  - Example:
    ```
    contract Caller {
        function delegateCall(address _lib, bytes memory _data) public returns (bool) {
            (bool success, ) = _lib.delegatecall(_data);
            require(success, "Delegatecall failed");
            return success;
        }
    }
    ```
- Key points: Use interfaces for ERC-20 interactions to ensure safe token transfers.

### Practice in Remix

**Create Token Interactor Contract**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `TokenInteractor.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface IERC20 {
      function transfer(address to, uint amount) external returns (bool);
      function balanceOf(address account) external view returns (uint);
      function approve(address spender, uint amount) external returns (bool);
  }

  contract TokenInteractor {
      address public tokenAddress;
      address public owner;

      constructor(address _token) {
          tokenAddress = _token;
          owner = msg.sender;
      }

      modifier onlyOwner() {
          require(msg.sender == owner, "Not owner");
          _;
      }

      function transferToken(address to, uint amount) public onlyOwner {
          IERC20 token = IERC20(tokenAddress);
          token.transfer(to, amount);
      }

      function getTokenBalance(address account) public view returns (uint) {
          IERC20 token = IERC20(tokenAddress);
          return token.balanceOf(account);
      }

      function approveSpender(address spender, uint amount) public onlyOwner {
          IERC20 token = IERC20(tokenAddress);
          token.approve(spender, amount);
      }
  }
  ```

- Compile with Solidity version 0.8.x.
- Deploy on Sepolia via MetaMask (use your `GrokToken` address from Week 6 as `_token`).
- Test:
  - Call `getTokenBalance(owner_address)` (returns your GROK balance).
  - Call `transferToken(receiver_address, 100 * 10^18)` from owner (transfers 100 GROK).
  - Call `approveSpender(spender_address, 50 * 10^18)` from owner (approves 50 GROK).
  - Call `transferToken` from non-owner (fails with "Not owner").
