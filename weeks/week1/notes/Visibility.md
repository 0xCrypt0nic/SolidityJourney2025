## Overview 📝

During the Week 1 - Day 3 in my `SolidityJourney2025`, I wrote a contract on Remix IDE. a simple code to test visibility of variable.
I deploy on Sepolia TestNet and test it.

## Commands and Steps 🛠️

### Write Counter.sol contract

     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;

     contract VisibilityTest {
         uint256 public publicVar = 1;
         uint256 private privateVar = 2;

         function setPrivateVar(uint256 _value) public {
             privateVar = _value;
         }

         function getPrivateVar() public view returns (uint256) {
             return privateVar;
         }
     }

### Deployed contract

- Contract available at : [0x561B0AEB870a4e5179B19e6C419223e394b1e75e](https://sepolia.etherscan.io/address/0x561B0AEB870a4e5179B19e6C419223e394b1e75e)
- setPrivateVar transaction : [0x382c4acb107c4ad29a6d661b3d14dec06e1911a8b04aac63ed69519bc9773301](https://sepolia.etherscan.io/tx/0x382c4acb107c4ad29a6d661b3d14dec06e1911a8b04aac63ed69519bc9773301)

### Details

- publicVar is public : automatically accessible with getter provided by public visibility.
- privateVar is private : impossible to see data, so we created getter and setter functions.
