// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERC20 {
    function transfer(address to, uint amount) external returns (bool);
    function balanceOf(address acount) external view returns (uint);
}

contract TokenCaller {
    address public tokenAddress;

    constructor(address _token) {
        tokenAddress = _token;
    }

    function transferToken(address to, uint amount) public {
        IERC20 token = IERC20(tokenAddress);
        token.transfer(to, amount);
    }

    function getTokenBalance(address account) public view returns (uint) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(account);
    }
}
