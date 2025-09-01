import { ethers } from "hardhat";

async function main(){
    const OptimizedCounter = await ethers.getContractFactory("OptimizedCounter");
    const counter = await OptimizedCounter.deploy();
    await counter.waitForDeployment();
    console.log(`OptimizedCounter deplyed to: ${counter.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});