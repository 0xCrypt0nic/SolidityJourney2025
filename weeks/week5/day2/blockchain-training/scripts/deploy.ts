import { ethers } from "hardhat";

async function main() {
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    await bank.waitForDeployment();
    console.log(`Bank deployed to : ${bank.getAddress}`);
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});