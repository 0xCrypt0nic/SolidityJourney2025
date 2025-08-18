## Overview 📝

During the Week 1 - Day 3 in my `SolidityJourney2025`, I wrote my first contract on Remix IDE. A basic counter, with increment / decrement methods.
I deploy on Sepolia TestNet and test it.

## Commands and Steps 🛠️

### Write Counter.sol contract

     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;

     contract Counter {
         uint256 public count;

         function increment() public {
             count += 1;
         }

         function decrement() public {
             count -= 1;
         }

         function getCount() public view returns (uint256) {
             return count;
         }
     }

### Deployed contract

- Contract available at : [0x1d442B289Bb4f1CCf129CB3418b7068A28F0deC5](https://sepolia.etherscan.io/address/0x1d442B289Bb4f1CCf129CB3418b7068A28F0deC5)
- Increment transaction : [0xe57ca4bc873f2522329f7a891444280caf37467377ff42452c7d51d3f98d37e3](https://sepolia.etherscan.io/tx/0xe57ca4bc873f2522329f7a891444280caf37467377ff42452c7d51d3f98d37e3)
- Decrement transaction : [0x5b748510cf2895e054ed6a1b4cf6749b2185392167c60002e3d2881452422449](https://sepolia.etherscan.io/tx/0x5b748510cf2895e054ed6a1b4cf6749b2185392167c60002e3d2881452422449)
