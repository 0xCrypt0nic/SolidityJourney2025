import { expect } from 'chai';
import {ethers} from 'hardhat';
import { Voting } from '../typechain-types';

describe("Voting", function() {

    let votingFactory: any;
    let voting: Voting;

    this.beforeEach(async function() {
        votingFactory = await ethers.getContractFactory("Voting");
        voting = await votingFactory.deploy(["Alice","Bob"]);
        await voting.waitForDeployment();
        console.log(`Voting deployed to: ${await voting.getAddress()}`);
    })

    it('Should allow voting', async function(){
        await voting.vote(0);
        const [name, voteCount] = await voting.getCandidate(0);
        expect(name).to.equal("Alice");
        expect(voteCount).to.equal(1);
    });

    it('Should prevent double voting', async function(){
        await voting.vote(0);
        await expect(voting.vote(0)).to.be.revertedWith("Already voted");
    });

    it("Should reject invalid candidate Id", async function(){
        await expect(voting.vote(999)).to.be.revertedWith("Invalid candidate");
    });
});