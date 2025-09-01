import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { OptimizedCounter } from "../typechain-types";

describe("OptimizedCounter", function() {
    let OptimizedCounter: any;
    let counter: OptimizedCounter;
    let owner: Signer;
    let nonOwner: Signer;

    this.beforeEach(async function() {
        OptimizedCounter = await ethers.getContractFactory("OptimizedCounter");
        [owner, nonOwner] = await ethers.getSigners();
        counter = await OptimizedCounter.deploy();
        await counter.waitForDeployment();
    });

    it("Should increment count for owner", async function(){
        await counter.increment();
        expect(await counter.getCount()).to.equal(1);
    });

    it("Should restrict increment to owner", async function(){
        await expect(counter.connect(nonOwner).increment()).to.be.revertedWith("Not Owner");
    });

    it("Should return count via view function", async function(){
        expect(await counter.getCount()).to.equal(0);
    });
});