# Week 2, Day 3: Testing and Project Wrap-Up

**Goal**: Write unit tests for the Voting contract using Hardhat and finalize the Week 2 project with documentation.

### Hardhat Testing

**Learn Hardhat Testing**:

- Read [Hardhat - Testing Contracts](https://v2.hardhat.org/hardhat-runner/docs/guides/test-contracts) to understand testing with Mocha and Chai.
- Key points:
  - **Mocha**: Test framework for organizing tests (e.g., `describe`, `it`).
  - **Chai**: Assertion library for checking results (e.g., `expect`).
  - **ethers.js**: Used in Hardhat to interact with contracts (e.g., deploy, call functions).
- Example test structure:
  ```
  const { expect } = require("chai");
  describe("ContractName", function () {
      it("should do something", async function () {
          expect(await contract.function()).to.equal(expectedValue);
      });
  });
  ```

**Write Tests for Voting.sol**:

- In your Hardhat project (`blockchain-training` from Week 1), ensure `Voting.sol` is in `/week2/contracts/`.
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

    it("should reject invalid candidate ID", async function () {
      await expect(voting.vote(999)).to.be.revertedWith("Invalid candidate");
    });
  });
  ```

- Run tests with `npx hardhat test` in the terminal.
- Verify all tests pass (check terminal output for "3 passing").
- Take a screenshot of the terminal showing test results.

### Resources

- [Hardhat - Testing Contracts](https://v2.hardhat.org/hardhat-runner/docs/guides/test-contracts) (testing guide).
- [Mocha Docs](https://mochajs.org/) (test framework overview).
- [Chai Docs](https://www.chaijs.com/) (assertion library reference).
- [Ethers.js Docs](https://docs.ethers.io/v5/) (contract interaction in tests).

### Livrable

- Passing tests in `/week2/day3/VotingProject/test/Voting-test.ts`.
