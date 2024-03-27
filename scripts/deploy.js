// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node &lt;script&gt;`.
//
// You can also run a script with `npx hardhat run &lt;script&gt;`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment&#39;s members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function main() {
  const FireBlocks = await hre.ethers.getContractFactory("FireBlocks");
  const fireBlocks = await FireBlocks.deploy();
  await fireBlocks.waitForDeployment();
  console.log("FireBlocks deployed to", await fireBlocks.target);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});