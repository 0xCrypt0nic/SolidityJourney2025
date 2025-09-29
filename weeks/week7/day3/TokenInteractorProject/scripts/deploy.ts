import { ethers } from "hardhat";

async function main(){
    const tokenAddress = "0xCC0324E6Ec79F8860F01c2501b4D43D5230E57AA";
    const TokenInteractor = await ethers.getContractFactory("TokenInteractor");
    const tokenInteractor = await TokenInteractor.deploy(tokenAddress);
    await tokenInteractor.waitForDeployment();
    const TIDeployedAddress = await tokenInteractor.getAddress();
    console.log(`TokenInteractor deployed to: ${TIDeployedAddress}`);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});