// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Bank {
    mapping(address => uint) public balances;
    address public owner;
    bool private locked; // Reentrancy guard

    error Unauthorized(address caller);
    error InsufficientBalance(uint requested, uint available);
    error ZeroAmount();
    error TransferFailed();
    error ReentrancyAttempt();

    constructor() {
        owner = msg.sender;
    }

    modifier nonReentrant() {
        if (locked) revert ReentrancyAttempt();
        locked = true;
        _;
        locked = false;
    }

    function deposit() public payable {
        if (msg.value == 0) revert ZeroAmount();
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public nonReentrant {
        if (msg.sender != owner) revert Unauthorized(msg.sender);
        if (amount > balances[msg.sender])
            revert InsufficientBalance(amount, balances[msg.sender]);
        balances[msg.sender] -= amount;
        (bool sent, ) = msg.sender.call{value: amount}("");
        if (!sent) revert TransferFailed();
    }

    function checkBalance() public view returns (uint) {
        assert(balances[msg.sender] >= 0);
        return balances[msg.sender];
    }
}
