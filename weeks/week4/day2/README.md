## Week 4, Day 2: Build a Contract Using Inheritance in Remix

**Goal**: Build an inherited contract in Remix to practice code reuse, deploying and testing on Sepolia.

### Solidity Documentation - Inheritance Deep Dive

**Read Solidity Docs**:

- Read [Solidity - Multiple Inheritance](https://docs.soliditylang.org/en/latest/contracts.html#multiple-inheritance-and-linearization) for handling multiple parents.
  - Key points: Solidity uses C3 linearization for method resolution in multiple inheritance (e.g., `contract C is A, B` calls B first if conflict).
  - Avoid diamond problems by explicit calls or virtual functions.
- Read [Solidity - Overriding](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) for virtual/override.
  - Key points: Use `virtual` in base for overridable functions, `override` in child to customize.
- Example of multiple inheritance:

  ```
  contract A {
      function foo() public virtual returns (string memory) {
          return "A";
      }
  }

  contract B {
      function foo() public virtual returns (string memory) {
          return "B";
      }
  }

  contract C is A, B {
      function foo() public override(A, B) returns (string memory) {
          return super.foo(); // Calls B.foo() due to linearization
      }
  }
  ```

### Practice in Remix

**Create Inherited Contract**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `InheritedZombie.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract Zombie {
      struct ZombieData {
          uint id;
          string name;
          uint level;
      }

      ZombieData[] public zombies;

      function createZombie(string memory _name, uint _level) public virtual {
          zombies.push(ZombieData(zombies.length, _name, _level));
      }

      function getZombie(uint _id) public view returns (string memory, uint) {
          return (zombies[_id].name, zombies[_id].level);
      }
  }

  contract SuperZombie is Zombie {
      address public owner;

      constructor() {
          owner = msg.sender;
      }

      modifier onlyOwner() {
          require(msg.sender == owner, "Not owner");
          _;
      }

      function createZombie(string memory _name, uint _level) public override onlyOwner {
          super.createZombie(_name, _level + 1); // Override to add extra level
      }

      function upgradeLevel(uint _id) public onlyOwner {
          zombies[_id].level += 1;
      }
  }
  ```

- Compile with Solidity version 0.8.x.
- Deploy `SuperZombie` on Sepolia.
- Test:
  - Call `createZombie("SuperGrok", 5)` from owner wallet (creates zombie with level 6 due to override).
  - Call `getZombie(0)` to verify name and level.
  - Call `upgradeLevel(0)` from owner (level becomes 7).
