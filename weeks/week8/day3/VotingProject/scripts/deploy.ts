import { ethers } from "hardhat";

async function main(){
    const VotingFactory = await ethers.getContractFactory('Voting');
    const voting = await VotingFactory.deploy(["Alice","Bob"]);
    await voting.waitForDeployment();
    console.log(`Voting contract deployed to: ${await voting.getAddress()}`);
    
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})