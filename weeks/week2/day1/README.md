# Week 2, Day 1: Structs, Arrays, and Mappings

**Goal**: Learn structs, arrays, and mappings in Solidity to handle complex data, using CryptoZombies and Remix for practice.

## CryptoZombies Lesson

**CryptoZombies Lesson 3: Structs and Arrays**:

- Access [CryptoZombies](https://cryptozombies.io/) and start Lesson 3.
- Learn:
  - **Structs**: Custom types to group related data (e.g., `struct Zombie { uint id; string name; }`).
  - **Arrays**: Dynamic lists (`uint[] numbers`) or fixed-size lists (`uint[5] numbers`).
- Complete all exercises, such as:
  - Defining a `Zombie` struct with `id` (uint) and `name` (string).
  - Creating a dynamic array `Zombie[] zombies` and adding a zombie with `push`.
  - Accessing array elements (e.g., `zombies[0].name`).
- Take a screenshot of a completed exercise showing the code and success message in the CryptoZombies editor.

**CryptoZombies Lesson 4: Payable & modifier**:

- Start Lesson 4.
- Learn:
  - **msg.sender**: Global variable to get the caller’s Ethereum address.
  - **Payable Functions**: How to accept ETH on your contract.
  - **modifier**: Create specific function like onlyOwner to use it directly on other functions definition.
- Complete all exercises, such as:
  - Creating a mapping to track zombie ownership (e.g., `mapping(address => uint) zombieOwner`).
  - Using `msg.sender` to associate a zombie with the caller’s address.

### Solidity Documentation - Structs & Mappings

**Read Solidity Docs**:

- Read [Solidity - Structs](https://docs.soliditylang.org/en/latest/types.html#structs) to understand how structs group variables and their use in contracts.
- Read [Solidity - Mappings](https://docs.soliditylang.org/en/latest/types.html#mapping-types) to learn about non-iterable key-value pairs and default values.
- Key points to note:
  - Structs are stored in `storage` (blockchain) or `memory` (temporary).
  - Mappings initialize all keys to zero/empty and cannot be iterated.
  - Example: `mapping(address => uint) public balances` maps addresses to balances.

### Practice in Remix

- Open [Remix IDE](https://remix.ethereum.org/) and create `ZombieFactory.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract ZombieFactory {
      struct Zombie {
          uint id;
          string name;
          uint level;
      }

      Zombie[] public zombies;
      mapping(address => uint) public zombieOwner;

      function createZombie(string memory _name, uint _level) public {
          uint newId = zombies.length;
          zombies.push(Zombie(newId, _name, _level));
          zombieOwner[msg.sender] = newId;
      }

      function getZombie(uint _id) public view returns (string memory, uint) {
          require(_id < zombies.length, "Invalid zombie ID");
          return (zombies[_id].name, zombies[_id].level);
      }
  }
  ```

- Compile (version 0.8.x) and deploy on Sepolia via MetaMask.
- Test:
  - Call `createZombie("Grok", 1)` and verify the zombie is added to `zombies` array.
  - Check `zombieOwner` mapping for your address.
  - Call `getZombie(0)` to retrieve zombie details.
