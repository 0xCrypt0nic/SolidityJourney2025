// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ErrorHandlingExample {
    address public owner;
    uint public balance = 100;

    error NotAuthorized(address caller);
    error InsufficientBalance(uint requested, uint available);

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint amount) public {
        require(amount > 0, "Amount must be greater than 0");
        balance += amount;
    }

    function withdraw(uint amount) public {
        if (msg.sender != owner) {
            revert NotAuthorized(msg.sender);
        }
        if (amount > balance) {
            revert InsufficientBalance(amount, balance);
        }
        balance -= amount;
    }

    function checkBalanceInvariant() public view {
        assert(balance >= 0);
    }
}
