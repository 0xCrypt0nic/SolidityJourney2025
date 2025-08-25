## Week 3, Day 1: Function Modifiers and Advanced Function Types

**Goal**: Learn function modifiers and advanced function types (pure, view) using CryptoZombies and Solidity documentation to control contract behavior.

### CryptoZombies Lesson

**CryptoZombies Lesson 5: Function Modifiers and Advanced Functions**:

- Access [CryptoZombies](https://cryptozombies.io/) and start Lesson 5.
- Learn:
  - **Modifiers**: Reusable code to restrict functions (e.g., `modifier onlyOwner() { require(msg.sender == owner); _; }`).
  - **View Functions**: Read state without modifying (e.g., getters).
  - **Pure Functions**: No state read/write (e.g., calculations).
- Complete exercises:
  - Create an `onlyOwner` modifier to restrict zombie updates.
  - Write a `view` function to read zombie data (e.g., `getZombieLevel`).
  - Write a `pure` function for math (e.g., `calculatePower`).

### Solidity Documentation - Function Modifiers & Types

**Read Solidity Docs**:

- Read [Solidity - Function Modifiers](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers).
  - Modifiers add conditions (e.g., `onlyOwner` checks `msg.sender`).
  - Use `_;` to insert function body.
- Read [Solidity - Functions](https://docs.soliditylang.org/en/latest/contracts.html#functions) for `view` and `pure`.
  - `view`: Reads state (e.g., `function getValue() public view returns (uint)`).
  - `pure`: No state access (e.g., `function add(uint a, uint b) public pure returns (uint)`).
- Example:

  ```
  contract ModifierExample {
      uint public value = 10;
      address public owner;

      constructor() {
          owner = msg.sender;
      }

      modifier onlyOwner() {
          require(msg.sender == owner, "Not owner");
          _;
      }

      function updateValue(uint _newValue) public onlyOwner {
          value = _newValue;
      }

      function getValue() public view returns (uint) {
          return value;
      }

      function multiply(uint _a, uint _b) public pure returns (uint) {
          return _a * _b;
      }
  }
  ```

### Practice in Remix

**Create Modifier Contract**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `ModifierExample.sol` (see code above).
- Compile with Solidity version 0.8.x.
- Deploy on Sepolia via MetaMask (ensure test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)).
- Test:
  - Call `getValue` (returns 10, no gas).
  - Call `multiply(3, 4)` (returns 12).
  - Call `updateValue(50)` from owner wallet (succeeds).
  - Try `updateValue(50)` from another wallet (fails with "Not owner").
- Take a screenshot of deployment or test results.
