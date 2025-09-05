// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./SafeMathLibrary.sol";

contract LibraryTest {
    using SafeMath for uint;

    uint public value = 100;

    function addValue(uint _amount) public {
        value = value.add(_amount);
    }

    function subValue(uint _amount) public {
        value = value.sub(_amount);
    }
}
