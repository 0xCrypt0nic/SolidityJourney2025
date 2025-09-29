import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { TokenInteractor, GrokToken } from "../typechain-types";

describe("TokenInteractor", function () {
    let tokenFactory: any;
    let interactorFactory: any;
    let grokToken: GrokToken;
    let tokenInteractor: TokenInteractor;
    let owner: Signer;
    let addr1: Signer;

    beforeEach(async function () {
        // Deploy GrokToken
        tokenFactory = await ethers.getContractFactory("GrokToken");
        [owner, addr1] = await ethers.getSigners();
        grokToken = await tokenFactory.deploy(ethers.parseEther("1000"));
        await grokToken.waitForDeployment();
        console.log("GrokToken deployed to:", await grokToken.getAddress()); // Debug

        // Deploy TokenInteractor with GrokToken address
        interactorFactory = await ethers.getContractFactory("TokenInteractor");
        tokenInteractor = await interactorFactory.deploy(await grokToken.getAddress());
        await tokenInteractor.waitForDeployment();
        console.log("TokenInteractor deployed to:", await tokenInteractor.getAddress()); // Debug

        // Transfer 100 GROK to TokenInteractor
        await grokToken.transfer(tokenInteractor.getAddress(), ethers.parseEther("100"));
    });

    it("should get token balance", async function () {
        const balance = await tokenInteractor.getTokenBalance(tokenInteractor.getAddress());
        console.log("Balance:", balance.toString()); // Debug
        expect(balance).to.equal(ethers.parseEther("100")); // Expect 100 GROK
    });

    it("should transfer token as owner", async function () {
        await tokenInteractor.transferToken(await addr1.getAddress(), ethers.parseEther("50"));
        const receiverBalance = await tokenInteractor.getTokenBalance(await addr1.getAddress());
        expect(receiverBalance).to.equal(ethers.parseEther("50"));
    });

    it("should revert transfer from non-owner", async function () {
        await expect(tokenInteractor.connect(addr1).transferToken(await owner.getAddress(), ethers.parseEther("10")))
            .to.be.revertedWith("Not Owner");
    });
});