import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { GrokToken } from "../typechain-types";

describe("GrokToken", function () {
    let contractFactory: any;
    let grokToken: GrokToken;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;

    this.beforeEach(async function () {
        contractFactory = await ethers.getContractFactory("GrokToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        grokToken = await contractFactory.deploy(ethers.parseEther("1000"));
        await grokToken.waitForDeployment();
    })

    it("Should have correct initial supply", async function() {
        expect(await grokToken.totalSupply()).to.equal(ethers.parseEther("1000"));
        expect(await grokToken.balanceOf(await owner.getAddress())).to.equal(ethers.parseEther("1000"));
    });

    it("Should transfer tokens correctly", async function () {
        await grokToken.transfer(
            await addr1.getAddress(),
            ethers.parseEther("100")
        );

        expect(await grokToken.balanceOf(await addr1.getAddress())).to.equal(ethers.parseEther("100"));
        expect(await grokToken.balanceOf(await owner.getAddress())).to.equal(ethers.parseEther("900"));
    });

    it("Should approve and transferFrom correctly", async function () {
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

    it("Should allow owner to mint", async function () {
      await grokToken.mint(await addr1.getAddress(), ethers.parseEther("200"));
      expect(await grokToken.balanceOf(await addr1.getAddress())).to.equal(
        ethers.parseEther("200")
      );
      expect(await grokToken.totalSupply()).to.equal(ethers.parseEther("1200"));
    });

    it("Should revert mint by non-owner", async function () {
      await expect(
        grokToken
          .connect(addr1)
          .mint(await addr2.getAddress(), ethers.parseEther("100"))
      ).to.be.revertedWithCustomError(grokToken, "Unauthorized");
    });
})