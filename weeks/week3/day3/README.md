## Day 3: Deploy and Test Optimized Contract

**Goal**: Deploy an optimized contract on Sepolia and write Hardhat tests to verify functionality.

### Hardhat Deployment and Testing

**Deploy OptimizedCounter.sol**:

- In your Hardhat project (`blockchain-training`), copy `OptimizedCounter.sol` to `/week3/contracts/`.
- Create `/week3/scripts/deploy.js`:

  ```
  async function main() {
      const OptimizedCounter = await ethers.getContractFactory("OptimizedCounter");
      const counter = await OptimizedCounter.deploy();
      await counter.deployed();
      console.log("OptimizedCounter deployed to:", counter.address);
  }

  main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
  });
  ```

- Update `hardhat.config.js` with Sepolia settings (use `.env` for private key):

  ```
  require("@nomicfoundation/hardhat-toolbox");
  require("dotenv").config();

  module.exports = {
      solidity: "0.8.20",
      networks: {
          sepolia: {
              url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
              accounts: [process.env.PRIVATE_KEY]
          }
      }
  };
  ```

- Run: `npx hardhat run scripts/deploy.js --network sepolia`.
- Note the contract address from terminal output.

**Write Tests for OptimizedCounter.sol**:

- Create `/week3/test/OptimizedCounter.test.js`:

  ```
  const { expect } = require("chai");

  describe("OptimizedCounter", function () {
      let OptimizedCounter, counter;

      beforeEach(async function () {
          OptimizedCounter = await ethers.getContractFactory("OptimizedCounter");
          counter = await OptimizedCounter.deploy();
          await counter.deployed();
      });

      it("should increment count for owner", async function () {
          await counter.increment();
          expect(await counter.getCount()).to.equal(1);
      });

      it("should restrict increment to owner", async function () {
          const [, nonOwner] = await ethers.getSigners();
          await expect(counter.connect(nonOwner).increment()).to.be.revertedWith("Not owner");
      });

      it("should return count via view function", async function () {
          expect(await counter.getCount()).to.equal(0);
      });
  });
  ```

- Run: `npx hardhat test` and verify all tests pass (check "3 passing" in terminal).
- Take a screenshot of test output.
