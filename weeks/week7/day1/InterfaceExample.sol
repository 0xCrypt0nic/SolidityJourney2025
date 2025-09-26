// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface ParentA {
    function test() external returns (uint256);
}

interface ParentB {
    function test() external returns (uint256);
}

interface SubInterface is ParentA, ParentB {
    // Must redifine test in order to assert that the parent meanings are compatible.
    function test() external override(ParentA, ParentB) returns (uint256);
}
