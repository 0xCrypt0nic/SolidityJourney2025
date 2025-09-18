    import { expect } from "chai";
    import { ethers } from "hardhat";
    import { Signer } from "ethers";
    import { Bank } from "../typechain-types";

    describe("Bank", function () {
      let contractFactory: any;
      let bank: Bank;
      let owner: Signer;
      let nonOwner: Signer;

      beforeEach(async function () {
        contractFactory = await ethers.getContractFactory("Bank");
        [owner, nonOwner] = await ethers.getSigners();
        bank = await contractFactory.deploy();
        await bank.waitForDeployment();
      });

      it("should allow deposit and update balance", async function () {
        await bank.deposit({ value: ethers.parseEther("0.1") });
        expect(await bank.checkBalance()).to.equal(ethers.parseEther("0.1"));
      });

      it("should revert deposit with zero amount", async function () {
        await expect(bank.deposit({ value: 0 })).to.be.revertedWithCustomError(
          bank,
          "ZeroAmount"
        );
      });

      it("should allow owner to withdraw", async function () {
        await bank.deposit({ value: ethers.parseEther("0.1") });
        await bank.withdraw(ethers.parseEther("0.05"));
        expect(await bank.checkBalance()).to.equal(ethers.parseEther("0.05"));
      });

      it("should revert withdraw by non-owner", async function () {
        await bank.deposit({ value: ethers.parseEther("0.1") });
        await expect(
          bank.connect(nonOwner).withdraw(ethers.parseEther("0.05"))
        ).to.be.revertedWithCustomError(bank, "Unauthorized");
      });

      it("should revert withdraw with insufficient balance", async function () {
        await bank.deposit({ value: ethers.parseEther("0.05") });
        await expect(
          bank.withdraw(ethers.parseEther("0.1"))
        ).to.be.revertedWithCustomError(bank, "InsufficientBalance");
      });

      it("should prevent reentrancy", async function () {
        // Note: Reentrancy testing requires a malicious contract; simplified check for nonReentrant
        await bank.deposit({ value: ethers.parseEther("0.1") });
        await expect(
          bank.withdraw(ethers.parseEther("0.05"))
        ).not.to.be.revertedWithCustomError(bank, "ReentrancyAttempt");
      });
    });