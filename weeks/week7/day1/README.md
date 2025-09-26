## Week7, Day 1: Learn Contract-to-Contract Interactions Using Interfaces

**Goal**: Understand how contracts interact using interfaces and function calls, practicing with examples in Remix.

### Solidity Documentation - Interfaces & Contract Calls

**Read Solidity Docs**:

- Read [Solidity - Interfaces](https://docs.soliditylang.org/en/latest/contracts.html#interfaces) to learn how interfaces define function signatures for external calls.
  - Key points: Interfaces have no implementation, only `external` functions, no state variables or constructors.
  - Used for interacting with other contracts without knowing their full code.
- Read [Solidity - Contract Calls](https://docs.soliditylang.org/en/latest/control-structures.html#external-function-calls) for low-level calls.
  - Key points: Use `address.call` for low-level interactions, but prefer high-level calls via interfaces for safety.
  - Avoid low-level calls for untrusted contracts to prevent reentrancy.
- Example:

  ```
  interface IERC20 {
      function transfer(address to, uint amount) external returns (bool);
      function balanceOf(address account) external view returns (uint);
  }

  contract Caller {
      function transferTokens(address _token, address _to, uint _amount) public {
          IERC20 token = IERC20(_token);
          token.transfer(_to, _amount);
      }
  }
  ```

### Practice in Remix

**Create Interacting Contract in Remix**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `TokenCaller.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  interface IERC20 {
      function transfer(address to, uint amount) external returns (bool);
      function balanceOf(address account) external view returns (uint);
  }

  contract TokenCaller {
      address public tokenAddress;

      constructor(address _token) {
          tokenAddress = _token;
      }

      function transferToken(address to, uint amount) public {
          IERC20 token = IERC20(tokenAddress);
          token.transfer(to, amount);
      }

      function getTokenBalance(address account) public view returns (uint) {
          IERC20 token = IERC20(tokenAddress);
          return token.balanceOf(account);
      }
  }
  ```

- Compile with Solidity version 0.8.x.
- Deploy on Sepolia via MetaMask (use your `GrokToken` address from Week 6 as `_token`).
- Test:
  - Call `getTokenBalance(your_address)` (returns your GROK balance).
  - Call `transferToken(receiver_address, 100 * 10^18)` (transfers 100 GROK if approved).
