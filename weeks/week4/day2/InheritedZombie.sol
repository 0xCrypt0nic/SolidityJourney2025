// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

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

    function createZombie(
        string memory _name,
        uint _level
    ) public override onlyOwner {
        super.createZombie(_name, _level + 1);
    }

    function upgradeLevel(uint _id) public onlyOwner {
        zombies[_id].level++;
    }
}
