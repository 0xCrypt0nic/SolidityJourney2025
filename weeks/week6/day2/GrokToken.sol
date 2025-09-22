// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GrokToken is ERC20 {
    address public owner;

    error Unauthorized(address caller);

    constructor(uint256 initialSupply) ERC20("GrokToken", "GROK") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        if (msg.sender != owner) revert Unauthorized(msg.sender);
        _mint(to, amount * 10 ** decimals());
    }
}
