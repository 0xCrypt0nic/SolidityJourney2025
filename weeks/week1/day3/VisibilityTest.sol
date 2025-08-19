//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VisibilityTest {
    uint256 public publicVar = 1;
    uint256 private privateVar = 2;

    function setPrivateVar(uint _value) public {
        privateVar = _value;
    }

    function getPrivateVar() public view returns (uint256) {
        return privateVar;
    }
}
