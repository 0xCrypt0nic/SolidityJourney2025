# Week 2 Program: Intermediate Solidity and First Project

**Objective**: Build on Week 1’s foundations by learning intermediate Solidity concepts (structs, mappings, events) and creating a simple voting smart contract with tests.

**Total Estimated Time**: 8-10 hours
**Prerequisites**: Completion of Week 1 (Node.js refresher, Solidity basics, Hardhat/MetaMask setup, Remix deployment). A computer with Node.js (version 18+), Hardhat, MetaMask, Remix IDE, and a GitHub repository (`SolidityJourney2025`).  
**Tools Needed**: Hardhat, Remix IDE, MetaMask, Sepolia test network, GitHub, VS Code (recommended).  
**Note**: Each day includes practical tasks, beginner-friendly resources, and GitHub updates to maintain an engaging portfolio.

---

## Day 1: Structs, Arrays, and Mappings

**Goal**: Learn structs and mappings in Solidity to handle complex data, using CryptoZombies and Remix for practice.

### CryptoZombies Lesson

**CryptoZombies Lesson 3: Structs and Arrays**:

- Access [CryptoZombies](https://cryptozombies.io/) and start Lesson 3.
- Learn:
  - **Structs**: Custom types to group data (e.g., `struct Zombie { uint id; string name; }`).
  - **Arrays**: Lists like `uint[] numbers` (dynamic) or `uint[5]` (fixed).
- Complete exercises (e.g., create a `Zombie` struct and add to an array).
- Tip: Use Chrome, save progress, and take a screenshot of a completed exercise.

**CryptoZombies Lesson 4: Mappings**:

- Start Lesson 4.
- Learn:
  - **Mappings**: Key-value stores (e.g., `mapping(address => uint) balances`).
  - **msg.sender**: Identifies the caller’s address.
- Complete exercises (e.g., map an address to a value).

### Solidity Documentation - Structs & Mappings

**Read Solidity Docs**:

- Read [Solidity - Structs](https://docs.soliditylang.org/en/latest/types.html#structs) and [Mappings](https://docs.soliditylang.org/en/latest/types.html#mapping-types).
- Note: Structs group data, mappings are non-iterable key-value pairs.

**Document in Markdown**:

- Create `/week2/notes/structs-mappings.md` in `SolidityJourney2025`.

### Resources:

- [CryptoZombies - Lesson 3](https://cryptozombies.io/en/lesson/3) (structs/arrays).
- [CryptoZombies - Lesson 4](https://cryptozombies.io/en/lesson/4) (mappings).
- [Solidity - Types](https://docs.soliditylang.org/en/latest/types.html).

### Livrable:

- Completed Lessons 3-4 in CryptoZombies.
- Markdown file `/week2/notes/structs-mappings.md`.

---

## Day 2: Events and Simple Voting Contract

**Goal**: Understand Solidity events and build a basic voting smart contract combining structs and mappings.

### Solidity Documentation - Events

**Read Solidity Docs on Events**:

- Read [Solidity - Events](https://docs.soliditylang.org/en/latest/contracts.html#events).
- Learn: Events log data (e.g., `event VoteCast(address voter)`), used by dApps to track contract actions.

**Create Voting Contract in Remix**:

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

- Compile (version 0.8.x) and deploy on Sepolia via MetaMask (ensure test ETH).
- Test:
  - Initialize with `["Alice", "Bob"]`.
  - Call `vote(0)` and check `getCandidate(0)` for updated vote count.
  - Verify event `VoteCast` in Remix’s "Transaction Log".

### Document the voting contract on your Github

**Document in Markdown**:

- Create `/week2/contracts/Voting_README.md`.

### Resources:

- [Solidity - Events](https://docs.soliditylang.org/en/latest/contracts.html#events).
- [Solidity by Example - Voting](https://solidity-by-example.org/app/voting/).
- [Remix IDE - Deploy](https://remix-ide.readthedocs.io/en/latest/create_deploy.html).

### Livrable:

- `Voting.sol` deployed on Sepolia.
- Markdown file `/week2/contracts/Voting_README.md`.

---

## Day 3: Testing and Project Wrap-Up

**Goal**: Write unit tests for the voting contract using Hardhat and finalize the Week 2 project.

### Hardhat Testing

**Learn Hardhat Testing**:

- Read [Hardhat - Testing Contracts](https://hardhat.org/hardhat-runner/docs/guides/test-contracts).
- Understand Mocha (test framework) and Chai (assertions, e.g., `expect`).

**Write Tests for Voting.sol**:

- In your Hardhat project (`blockchain-training` from Week 1), copy `Voting.sol` to `/week2/contracts/`.
- Create `/week2/test/Voting.test.js`:

  ```
  const { expect } = require("chai");

  describe("Voting", function () {
    let Voting, voting;

    beforeEach(async function () {
      Voting = await ethers.getContractFactory("Voting");
      voting = await Voting.deploy(["Alice", "Bob"]);
      await voting.deployed();
    });

    it("should allow voting", async function () {
      await voting.vote(0);
      const [name, voteCount] = await voting.getCandidate(0);
      expect(name).to.equal("Alice");
      expect(voteCount).to.equal(1);
    });

    it("should prevent double voting", async function () {
      await voting.vote(0);
      await expect(voting.vote(0)).to.be.revertedWith("Already voted");
    });
  });
  ```

- Run: `npx hardhat test`.
- Check for passing tests in the terminal.
- Take a screenshot of the test output.

### Document on your Github

- Create `/week2/notes/voting-test.md`:

### Resources:

- [Hardhat - Testing Contracts](https://hardhat.org/hardhat-runner/docs/guides/test-contracts).
- [Mocha Docs](https://mochajs.org/) (basic overview).

### Livrable:

- Passing tests in `/week2/test/Voting.test.js`.
- Markdown files `/week2/notes/voting-test.md` and `/week2/README.md`.
