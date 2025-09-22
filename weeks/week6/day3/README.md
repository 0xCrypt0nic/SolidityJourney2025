## Week6, Day 3: Test and Document the Token Contract

**Goal**: Write comprehensive Hardhat tests for `GrokToken.sol` in TypeScript, deploy it, and finalize Week 6 documentation.

### Practice in Hardhat

**Setup Hardhat Project**:

- Ensure your Hardhat project (`blockchain-training`) has OpenZeppelin installed:
  ```
  npm install @openzeppelin/contracts
  ```
- Copy `GrokToken.sol` to `/week6/contracts/GrokToken.sol` (same as Day 2).
- Verify `hardhat.config.ts`:

  ```typescript
  import { HardhatUserConfig } from "hardhat/config";
  import "@nomicfoundation/hardhat-toolbox";
  import "@typechain/hardhat";
  import * as dotenv from "dotenv";

  dotenv.config();

  const config: HardhatUserConfig = {
    solidity: "0.8.20",
    networks: {
      sepolia: {
        url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
        accounts: [process.env.PRIVATE_KEY || ""],
      },
    },
  };

  export default config;
  ```

- Ensure `.env` has `PRIVATE_KEY` and is in `.gitignore`.

**Deploy Script**:

- Create `/week6/scripts/deploy.ts`:

  ```typescript
  import { ethers } from "hardhat";

  async function main() {
    const initialSupply = ethers.parseEther("1000"); // 1000 GROK
    const GrokToken = await ethers.getContractFactory("GrokToken");
    const grokToken = await GrokToken.deploy(initialSupply);
    await grokToken.deployed();
    console.log(`GrokToken deployed to: ${grokToken.address}`);
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  ```

**Test Script**:

- Create `/week6/test/GrokToken.test.ts`:

  ```typescript
  import { expect } from "chai";
  import { ethers } from "hardhat";
  import { Signer } from "ethers";
  import { GrokToken } from "../typechain-types";

  describe("GrokToken", function () {
    let contractFactory: any;
    let grokToken: GrokToken;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;

    beforeEach(async function () {
      contractFactory = await ethers.getContractFactory("GrokToken");
      [owner, addr1, addr2] = await ethers.getSigners();
      grokToken = await contractFactory.deploy(ethers.parseEther("1000"));
      await grokToken.deployed();
    });

    it("should have correct initial supply", async function () {
      expect(await grokToken.totalSupply()).to.equal(ethers.parseEther("1000"));
      expect(await grokToken.balanceOf(await owner.getAddress())).to.equal(
        ethers.parseEther("1000")
      );
    });

    it("should transfer tokens correctly", async function () {
      await grokToken.transfer(
        await addr1.getAddress(),
        ethers.parseEther("100")
      );
      expect(await grokToken.balanceOf(await addr1.getAddress())).to.equal(
        ethers.parseEther("100")
      );
      expect(await grokToken.balanceOf(await owner.getAddress())).to.equal(
        ethers.parseEther("900")
      );
    });

    it("should approve and transferFrom correctly", async function () {
      await grokToken.approve(
        await addr1.getAddress(),
        ethers.parseEther("50")
      );
      expect(
        await grokToken.allowance(
          await owner.getAddress(),
          await addr1.getAddress()
        )
      ).to.equal(ethers.parseEther("50"));
      await grokToken
        .connect(addr1)
        .transferFrom(
          await owner.getAddress(),
          await addr2.getAddress(),
          ethers.parseEther("50")
        );
      expect(await grokToken.balanceOf(await addr2.getAddress())).to.equal(
        ethers.parseEther("50")
      );
    });

    it("should allow owner to mint", async function () {
      await grokToken.mint(await addr1.getAddress(), ethers.parseEther("200"));
      expect(await grokToken.balanceOf(await addr1.getAddress())).to.equal(
        ethers.parseEther("200")
      );
      expect(await grokToken.totalSupply()).to.equal(ethers.parseEther("1200"));
    });

    it("should revert mint by non-owner", async function () {
      await expect(
        grokToken
          .connect(addr1)
          .mint(await addr2.getAddress(), ethers.parseEther("100"))
      ).to.be.revertedWithCustomError(grokToken, "Unauthorized");
    });
  });
  ```

**Compile, Deploy, and Test**:

- Compile: `npx hardhat compile` (generates `typechain-types/GrokToken.ts`).
- Deploy: `npx hardhat run scripts/deploy.ts --network sepolia`.
- Test: `npx hardhat test`.
- **Verify**:
  - Check for "5 passing" in the terminal.
  - Verify deployment on [Sepolia Etherscan](https://sepolia.etherscan.io/).
- **Troubleshooting**:
  - Error "Cannot find module 'typechain-types'"? Run `npx hardhat typechain`.
  - "TypeError"? Verify `tsconfig.json` includes `"include": ["scripts", "test", "typechain-types"]`.
  - Test fails? Check error messages match (e.g., `Unauthorized`).
  - No test ETH? Request from [Sepolia Faucet](https://sepoliafaucet.com/).
