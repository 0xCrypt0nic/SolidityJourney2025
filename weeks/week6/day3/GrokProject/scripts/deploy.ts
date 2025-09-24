import { ethers } from "hardhat";

async function main(){
    const initialSupply = ethers.parseEther("1000"); // 1000 GROK
    const GrokToken = await ethers.getContractFactory("GrokToken");
    const grokToken = await GrokToken.deploy(initialSupply);
    await grokToken.waitForDeployment();
    const grokTokenDeployedAddress = await grokToken.getAddress();
    console.log(`GrokToken deployed to: ${grokTokenDeployedAddress}`);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});