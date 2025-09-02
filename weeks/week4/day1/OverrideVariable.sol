// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract A {
    string public name = "Contract A";

    function getNam() public view returns (string memory) {
        return name;
    }
}

// Shadowing is disallowed in soldidity 0.6
// This will not compile
// contract B is A {
// string public name = "Contract B";
//}

contract C is A {
    // this is the correct way to override inherited state variables.
    constructor() {
        name = "Contract C";
    }

    // C.getName returns "Contract ".
}
