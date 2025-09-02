## Week 4, Day 1: Study Solidity Inheritance and Interfaces

**Goal**: Learn Solidity inheritance and interfaces using CryptoZombies and documentation to create modular contracts.

### SolidityByExample Lesson

**Inheritance / Interface Lesson**:

- Access [SolidityByExample](https://solidity-by-example.org/inheritance/) and start Lesson Inheritance.
- Learn:
  - **Inheritance**: Extend contracts with `is` keyword.
  - **Interfaces**: Define function signatures for external calls.
  - **Virtual/Override**: Use `virtual` in parent functions and `override` in child to customize behavior (e.g., override a function to add logic).
  - **Super**: Call parent functions with `super` (e.g., `super.updateLevel()` in an overridden function).

### Solidity Documentation - Inheritance & Interfaces

**Read Solidity Docs**:

- Read [Solidity - Inheritance](https://docs.soliditylang.org/en/latest/contracts.html#inheritance) for details on single and multiple inheritance.

  - Key points: Contracts can inherit multiple parents (e.g., `contract C is A, B`), but diamond problems are resolved with explicit calls.
  - Use `virtual` for overridable functions and `override` in children.
  - Example:

    ```
    contract Base {
        uint public data;

        function setData(uint _data) public virtual {
            data = _data;
        }
    }

    contract Derived is Base {
        function setData(uint _data) public override {
            data = _data * 2; // Override to double the value
        }
    }
    ```

- Read [Solidity - Interfaces](https://docs.soliditylang.org/en/latest/contracts.html#interfaces) for defining external APIs.

  - Key points: Interfaces cannot have state variables or constructors, only function signatures with `external`.
  - Useful for calling other contracts without full implementation.
  - Example:

    ```
    interface Token {
        function transfer(address to, uint amount) external returns (bool);
        function balanceOf(address account) external view returns (uint);
    }

    contract MyContract {
        Token public token;

        constructor(address _tokenAddress) {
            token = Token(_tokenAddress);
        }

        function sendToken(address to, uint amount) public {
            token.transfer(to, amount);
        }
    }
    ```

- Additional notes: Inheritance promotes code reuse (e.g., extend ERC-20 base), interfaces enable interoperability (e.g., ERC standards).

### Practice in Remix

**Create Inheritance Contract in Remix**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `InheritanceExample.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract BaseCounter {
      uint8 public count;

      function increment() public virtual {
          count += 1;
      }

      function getCount() public view returns (uint8) {
          return count;
      }
  }

  interface ICounter {
      function increment() external;
      function getCount() external view returns (uint8);
  }

  contract DerivedCounter is BaseCounter {
      function increment() public override {
          super.increment(); // Call parent
          count += 1; // Extra increment
      }

      function callInterface(address _counterAddress) public {
          ICounter counter = ICounter(_counterAddress);
          counter.increment();
      }
  }
  ```

- Compile with Solidity version 0.8.x.
- Deploy `DerivedCounter` on Sepolia via MetaMask (ensure test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)).
- Test:
  - Call `increment` (count increases by 2 due to override).
  - Call `getCount` (view, returns current count).
  - Deploy `BaseCounter` separately, note its address, then call `callInterface(baseAddress)` from `DerivedCounter` to increment the base via interface.
- Take a screenshot of Remix interface showing deployment, test results, or override behavior.
