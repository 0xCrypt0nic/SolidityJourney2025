## Overview 📝

During the Week 1 - Day 1 in my `SolidityJourney2025`, I learn how to use payable functions, modifier and mapping.

- **Structs**: Group related data.
  ```
  struct Zombie {
      uint id;
      string name;
  }
  Zombie[] public zombies;
  ```
- **Mappings**: Key-value stores, non-iterable, default to zero.
  ```
  mapping(address => uint) public zombieOwner;
  function assignZombie(address _owner, uint _zombieId) public {
      zombieOwner[_owner] = _zombieId;
  }
  ```
- **Payable**: Functions that accept Ether, use `msg.value`.
  ```
  function buyZombie() public payable {
      require(msg.value >= 0.01 ether, "Insufficient Ether");
      zombieOwner[msg.sender] = zombies.length;
  }
  ```
- **Modifiers**: Reusable conditions, e.g., `onlyOwner` restricts to contract owner.
  ```
  address public owner;
  constructor() {
      owner = msg.sender;
  }
  modifier onlyOwner() {
      require(msg.sender == owner, "Not owner");
      _;
  }
  function updateZombie(uint _id) public onlyOwner {
      zombies[_id].name = "Updated";
  }
  ```
- **Practice**: Completed CryptoZombies Lessons 3-4, focusing on mappings, payable, and onlyOwner.

### Resources

- [Solidity - Structs](https://docs.soliditylang.org/en/latest/types.html#structs)
- [Solidity - Mappings](https://docs.soliditylang.org/en/latest/types.html#mapping-types)
