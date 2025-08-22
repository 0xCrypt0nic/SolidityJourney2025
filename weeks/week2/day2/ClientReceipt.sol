// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract ClientReceipt {
    event Deposit(address indexed from, bytes32 indexed id, uint value);

    function deposit(bytes32 id) public payable {
        // Events are emitted using 'emit', followed by
        // the name of the event and the arguments
        // (if any) in parentheses. Any such invocation
        // (even deeply nested) can be detected from
        // the JavaScript API by filtering for 'Deposit'.
        emit Deposit(msg.sender, id, msg.value);
    }
}
