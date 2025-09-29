// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERC20 {
    function transfer(address to, uint amount) external returns (bool);
    function balanceOf(address account) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
}

contract TokenInteractor {
    address public tokenAddress;
    address public owner;

    constructor(address _token) {
        tokenAddress = _token;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function transferToken(address to, uint amount) public onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        token.transfer(to, amount);
    }

    function getTokenBalance(address account) public view returns (uint) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(account);
    }

    function approveSpender(address spender, uint amount) public onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        token.approve(spender, amount);
    }
}
