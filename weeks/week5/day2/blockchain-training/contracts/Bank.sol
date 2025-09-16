// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Bank {
    mapping(address => uint) public balances;
    address public owner;

    error Unauthorized(address caller);
    error InsufficientBalance(uint requested, uint available);
    error ZeroAmount();

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint amount) public {
        if (amount == 0) revert ZeroAmount();
        balances[msg.sender] += amount;
    }

    function withdraw(uint amount) public {
        if (msg.sender != owner) revert Unauthorized(msg.sender);
        if (amount >= balances[msg.sender])
            revert InsufficientBalance(amount, balances[msg.sender]);
        balances[msg.sender] -= amount;
    }

    function checkBalance() public view returns (uint) {
        assert(balances[msg.sender] >= 0);
        return balances[msg.sender];
    }
}
