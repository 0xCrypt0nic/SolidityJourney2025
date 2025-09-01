// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OptimizedCounter {
    uint8 public count; // Use uint8 instead of uint256
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function increment() public onlyOwner {
        count++;
    }

    function getCount() public view returns (uint8) {
        return count;
    }
}
