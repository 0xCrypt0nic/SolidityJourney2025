## Week 5, Day 1: Learn Error Handling with `require`, `assert`, and `revert`

**Goal**: Understand Solidity error handling mechanisms using Solidity by Example and documentation, implementing checks in a sample contract.

### Solidity by Example

**Study Error Handling**:

- Visit [Solidity by Example - Error Handling](https://solidity-by-example.org/error/) and complete the examples.
- Learn:
  - **`require`**: Validates inputs/conditions, reverts with an optional error message (e.g., `require(msg.sender == owner, "Not owner")`).
  - **`assert`**: Checks invariants, reverts without a message, used for internal errors (e.g., `assert(totalSupply >= 0)`).
  - **`revert`**: Explicitly reverts with a message or custom error (e.g., `revert("Invalid input")`).
  - **Custom Errors**: Define reusable errors for gas efficiency (e.g., `error NotAuthorized()`).
- Example from Solidity by Example:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract ErrorHandling {
      address public owner;

      constructor() {
          owner = msg.sender;
      }

      function restrictedFunction() public {
          require(msg.sender == owner, "Caller is not owner");
          // Function logic
      }

      function checkInvariant(uint _value) public pure {
          assert(_value >= 0);
      }

      function manualRevert() public pure {
          revert("Manual revert triggered");
      }
  }
  ```

- Practice the examples in Remix:
  - Deploy the contract.
  - Call `restrictedFunction` from owner (succeeds) and non-owner (fails with "Caller is not owner").
  - Call `checkInvariant(0)` (succeeds) and `checkInvariant(-1)` (fails with assert).
  - Call `manualRevert` (fails with "Manual revert triggered").

### Solidity Documentation - Error Handling

**Read Solidity Docs**:

- Read [Solidity - Error Handling](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions).

  - **Key points**:
    - `require`: Best for input validation or external conditions (e.g., checking `msg.sender`).
    - `assert`: For internal errors that should never happen (e.g., state corruption).
    - `revert`: Flexible, can be used with custom errors for gas savings.
    - Custom errors: Define with `error` keyword (e.g., `error InsufficientBalance(uint requested, uint available)`).
  - Example with custom error:

    ```
    error NotEnoughFunds(uint requested, uint available);

    contract CustomError {
        uint public balance = 100;

        function withdraw(uint amount) public {
            if (amount > balance) {
                revert NotEnoughFunds(amount, balance);
            }
            balance -= amount;
        }
    }
    ```

- Understand gas implications:
  - Custom errors are more gas-efficient than string messages in `require`/`revert`.
  - `assert` consumes all gas in pre-0.8.0; post-0.8.0, it reverts like `require`.

### Practice in Remix

**Create Error Handling Contract**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `ErrorHandlingExample.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract ErrorHandlingExample {
      address public owner;
      uint public balance = 100;

      error NotAuthorized(address caller);
      error InsufficientBalance(uint requested, uint available);

      constructor() {
          owner = msg.sender;
      }

      function deposit(uint amount) public {
          require(amount > 0, "Amount must be greater than 0");
          balance += amount;
      }

      function withdraw(uint amount) public {
          if (msg.sender != owner) {
              revert NotAuthorized(msg.sender);
          }
          if (amount > balance) {
              revert InsufficientBalance(amount, balance);
          }
          balance -= amount;
      }

      function checkBalanceInvariant() public view {
          assert(balance >= 0);
      }
  }
  ```

- Compile with Solidity version 0.8.x.
- Deploy on Sepolia via MetaMask (ensure test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)).
- Test:
  - Call `deposit(50)` (balance becomes 150).
  - Call `withdraw(30)` from owner (balance becomes 120).
  - Call `withdraw(200)` (fails with `InsufficientBalance`).
  - Call `withdraw(10)` from non-owner (fails with `NotAuthorized`).
  - Call `checkBalanceInvariant` (succeeds).
  - Try `deposit(0)` (fails with "Amount must be greater than 0").
