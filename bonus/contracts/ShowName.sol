// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

contract ShowName {
    string MyName;

    function set(string memory name) public {
        MyName = name;
    }

    function get() public view returns (string memory) {
        return MyName;
    }
}
