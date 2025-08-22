import { expect } from 'chai';
import hre from "hardhat";
import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Voting", function(){

    async function deployVotingFixture(){
        const voting = await hre.ethers.deployContract("Voting", [["Alice","Bob"]]);
        return voting;
    };

    it('Should allow voting', async function(){
        const voting = await loadFixture(deployVotingFixture);
        await voting.vote(0);
        const [name, voteCount] = await voting.getCandidate(0);
        expect(name).to.equal("Alice");
        expect(voteCount).to.equal(1);
    });

    it('Should prevent double voting', async function(){
        const voting = await loadFixture(deployVotingFixture);
        await voting.vote(0);
        await expect(voting.vote(0)).to.be.revertedWith("Already voted");
    });

    it("Should reject invalid candidate Id", async function(){
        const voting = await loadFixture(deployVotingFixture);
        await expect(voting.vote(999)).to.be.revertedWith("Invalid candidate");
    });
});