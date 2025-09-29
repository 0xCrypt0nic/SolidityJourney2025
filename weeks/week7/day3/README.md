## Week 7, Day 3: Document and Deploy the Interacting Contract

**Goal**: Deploy the interacting contract with Hardhat (TypeScript) and document the Week 7 project.

### Hardhat Deployment and Testing

**Deploy TokenInteractor.sol**:

- In your Hardhat project (`blockchain-training`), copy `TokenInteractor.sol` to `/week7/contracts/`.
- Update `hardhat.config.ts` if needed (Sepolia network, `PRIVATE_KEY` in `.env`).
- Create `/week7/scripts/deploy.ts`:

  ```
  import { ethers } from "hardhat";

  async function main() {
      const tokenAddress = "0xYOUR_GROK_TOKEN_ADDRESS"; // From Week 6
      const TokenInteractor = await ethers.getContractFactory("TokenInteractor");
      const tokenInteractor = await TokenInteractor.deploy(tokenAddress);
      await tokenInteractor.deployed();
      console.log(`TokenInteractor deployed to: ${tokenInteractor.address}`);
  }

  main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
  });
  ```

- Run deployment: `npx hardhat run scripts/deploy.ts --network sepolia`.
- Note the contract address from terminal output.

**Write Tests for TokenInteractor.sol**:

- Create `/week7/test/TokenInteractor.test.ts`:

  ```
  import { expect } from "chai";
  import { ethers } from "hardhat";
  import { Signer } from "ethers";
  import { TokenInteractor } from "../typechain-types";

  describe("TokenInteractor", function () {
      let contractFactory: any;
      let tokenInteractor: TokenInteractor;
      let owner: Signer;
      let addr1: Signer;
      let tokenAddress = "0xYOUR_GROK_TOKEN_ADDRESS"; // From Week 6

      beforeEach(async function () {
          contractFactory = await ethers.getContractFactory("TokenInteractor");
          [owner, addr1] = await ethers.getSigners();
          tokenInteractor = await contractFactory.deploy(tokenAddress);
          await tokenInteractor.deployed();
      });

      it("should get token balance", async function () {
          const balance = await tokenInteractor.getTokenBalance(await owner.getAddress());
          expect(balance).to.be.gte(0); // Check owner balance
      });

      it("should transfer token as owner", async function () {
          await tokenInteractor.transferToken(await addr1.getAddress(), ethers.parseEther("50"));
          const receiverBalance = await tokenInteractor.getTokenBalance(await addr1.getAddress());
          expect(receiverBalance).to.equal(ethers.parseEther("50"));
      });

      it("should revert transfer from non-owner", async function () {
          await expect(tokenInteractor.connect(addr1).transferToken(await owner.getAddress(), ethers.parseEther("10")))
              .to.be.revertedWith("Not owner");
      });
  });
  ```

- Run tests: `npx hardhat test`.
- Verify: Check for "3 passing" in the terminal.
- Troubleshooting:
  - "Invalid token address"? Replace `0xYOUR_GROK_TOKEN_ADDRESS` with your actual `GrokToken` address from Week 6.
  - "TypeError"? Run `npx hardhat compile` to generate `typechain-types/TokenInteractor.ts`.
  - Test fails? Ensure sufficient token balance in owner wallet (call `mint` from GrokToken if needed).
