// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;
    event VoteCast(address indexed voter, uint candidateId);

    constructor(string[] memory candidateNames) {
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId < candidates.length, "Invalid candidate");
        candidates[_candidateId].voteCount += 1;
        hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, _candidateId);
    }

    function getCandidate(
        uint _candidateId
    ) public view returns (string memory, uint) {
        require(_candidateId < candidates.length, "Invalid candidate");
        return (
            candidates[_candidateId].name,
            candidates[_candidateId].voteCount
        );
    }
}
