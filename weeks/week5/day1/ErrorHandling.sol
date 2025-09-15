// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ErrorHandling {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function restrictedFunction() public view {
        require(msg.sender == owner, "Caller is not owner");
        // Function logic
    }

    function checkInvariant(uint _value) public pure {
        assert(_value >= 0);
    }

    function manualRevert() public pure {
        revert("Manual revert triggered");
    }
}
