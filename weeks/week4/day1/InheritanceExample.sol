// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BaseCounter {
    uint8 public count;

    function increment() public virtual {
        count++;
    }

    function getCount() public view returns (uint8) {
        return count;
    }
}

interface ICounter {
    function increment() external;
    function getCount() external view returns (uint8);
}

contract DerivedCounter is BaseCounter {
    function increment() public override {
        super.increment();
        count++;
    }

    function callInterface(address _counterAddress) public {
        ICounter counter = ICounter(_counterAddress);
        counter.increment();
    }
}
