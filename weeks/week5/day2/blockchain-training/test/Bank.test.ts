import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { Bank } from '../typechain-types/Bank';

describe("Bank", function () {
    let contractFactory: any;
    let bank: Bank;
    let owner: Signer;
    let nonOwner: Signer;

    this.beforeEach(async function () {
        contractFactory = await ethers.getContractFactory("Bank");
        [owner, nonOwner] = await ethers.getSigners();
        bank = await contractFactory.deploy();
        await bank.waitForDeployment();
    });

    it("Should allow deposit and update balance", async function(){
        await bank.deposit(100);
        expect(await bank.checkBalance()).to.equal(100);
    });

    it("Should revert deposit with zero amount", async function(){
        await expect(bank.deposit(0)).to.be.revertedWithCustomError(
            bank,
            "ZeroAmount"
        );
    });

    it ("Should allow owner to withdraw", async function(){
        await bank.deposit(100);
        await bank.withdraw(50);
        expect(await bank.checkBalance()).to.equal(50);
    });

    it ("Should revert withdraw by non-owner", async function(){
        await bank.deposit(100);
        await expect(
            bank.connect(nonOwner).withdraw(50)
        ).to.be.revertedWithCustomError(bank,"Unauthorized");
    });

    it("Should revert withdraw with insufficient balance", async function (){
        await bank.deposit(50);
        await expect(bank.withdraw(100)).to.be.revertedWithCustomError(bank,"InsufficientBalance");
    });
});