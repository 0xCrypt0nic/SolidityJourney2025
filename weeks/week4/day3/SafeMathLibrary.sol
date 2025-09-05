// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library SafeMath {
    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        require(c >= a, "Addition overflow");
        return c;
    }

    function sub(uint a, uint b) internal pure returns (uint) {
        require(b <= a, "Subtraction overflow");
        return a - b;
    }
}
