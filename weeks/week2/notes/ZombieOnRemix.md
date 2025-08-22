## Overview 📝

Create and deploy the ZombieFactory contract on Sepolia.
Use it !

## Commands and Steps 🛠️

### Write Counter.sol contract

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

### Deployed contract

- Contract available at : [0x031B4aB0261515dc83502E9084DACfE41000ff8d](https://sepolia.etherscan.io/address/0x031b4ab0261515dc83502e9084dacfe41000ff8d)
- Create a zombie : [0xae9aa1b10d9fc12f8542f8e5d8974eaf28c605c4e20b98d40bf248eed31ddef2](https://sepolia.etherscan.io/tx/0xae9aa1b10d9fc12f8542f8e5d8974eaf28c605c4e20b98d40bf248eed31ddef2)
