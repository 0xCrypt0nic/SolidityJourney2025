import { ethers } from "hardhat";

async function main() {
    const ShowName = await ethers.getContractFactory('ShowName');
    const showName = await ShowName.deploy();

    await showName.waitForDeployment();
    console.log(`Contract deployed to: ${await showName.getAddress()}`);

    await showName.set('0xCryptonic');
    console.log(`The name is: ${await showName.get()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})