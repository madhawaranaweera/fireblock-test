// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node &lt;script&gt;`.
//
// You can also run a script with `npx hardhat run &lt;script&gt;`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment&#39;s members to the
// global scope, and execute the script.
const hre = require("hardhat");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
async function main() {
    const contractAddress = "0x885Dbe43e66121471b4dBf97327659Cb068f62b3";
    const signer = (await hre.ethers.getSigners())[0];
    const signerAdderss = await signer.getAddress();
    const contract = await hre.ethers.getContractAt("FireBlocks", contractAddress, signer);
    const tokenData = {
        "name" : "FireBlock",
        "image": "https://i.ibb.co/4YgMZ8S/fire-Block-Logo.png",
    }
    const tokenURI = parser.format('.json', JSON.stringify(tokenData)).content
    const tx = await contract.safeMint(signerAdderss, tokenURI);
    await tx.wait()
    console.log("A new NFT has been minted to: ", signerAdderss);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});