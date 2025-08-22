# Week 2, Day 2: Events and Simple Voting Contract

**Goal**: Understand Solidity events and build a basic voting smart contract combining structs and mappings using Remix.

### Solidity Documentation - Events

**Read Solidity Docs**:

- Read [Solidity - Events](https://docs.soliditylang.org/en/latest/contracts.html#events) to learn how events log data for external applications.
- Key points:
  - Events notify dApps of contract actions (e.g., `event VoteCast(address voter, uint candidateId)`).
  - Use `emit` to trigger events.
  - `indexed` fields (up to 3) make event data searchable.
- Example:
  ```
  event VoteCast(address indexed voter, uint candidateId);
  function vote(uint _candidateId) public {
      emit VoteCast(msg.sender, _candidateId);
  }
  ```

### Create Voting Contract in Remix

**Build and Deploy Voting Contract**:

- Open [Remix IDE](https://remix.ethereum.org/) and create `Voting.sol`:

  ```
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

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

      function getCandidate(uint _candidateId) public view returns (string memory, uint) {
          require(_candidateId < candidates.length, "Invalid candidate");
          return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
      }
  }
  ```

- Compile with Solidity version 0.8.x.
- Deploy on Sepolia test network via MetaMask (ensure test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)).
- Test:
  - Initialize with `["Alice", "Bob"]` in the constructor.
  - Call `vote(0)` and approve the transaction in MetaMask.
  - Check `getCandidate(0)` to confirm Alice’s vote count is 1.
  - Verify the `VoteCast` event in Remix’s "Transaction Log" (shows voter address and candidate ID).
- Take a screenshot of the Remix interface showing deployment or the event log.

### Resources

- [Solidity - Events](https://docs.soliditylang.org/en/latest/contracts.html#events) (event documentation).
- [Solidity by Example - Voting](https://solidity-by-example.org/app/voting/) (voting contract example).
- [Remix IDE - Deploy](https://remix-ide.readthedocs.io/en/latest/create_deploy.html) (deployment guide).
- [Solidity by Example - Events](https://solidity-by-example.org/events/) (additional event reference).

### Livrable

- `Voting.sol` deployed on Sepolia.
