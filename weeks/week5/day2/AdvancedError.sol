// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

error UnAuthorized();
error ZeroAmount();

contract AdvancedError {
    mapping(address => uint) public balances;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint amount) public {
        if (amount == 0) revert ZeroAmount();
        balances[msg.sender] += amount;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balancd");
        if (msg.sender != owner) revert UnAuthorized();
        balances[msg.sender] -= amount;
    }
}
