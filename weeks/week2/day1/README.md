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

**CryptoZombies Lesson 4: Mappings and Addresses**:

- Start Lesson 4.
- Learn:
  - **Mappings**: Key-value stores (e.g., `mapping(address => uint) balances`).
  - **msg.sender**: Global variable to get the caller’s Ethereum address.
- Complete all exercises, such as:
  - Creating a mapping to track zombie ownership (e.g., `mapping(address => uint) zombieOwner`).
  - Using `msg.sender` to associate a zombie with the caller’s address.
