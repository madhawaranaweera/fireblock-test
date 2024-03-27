require("@nomicfoundation/hardhat-toolbox");
require("@fireblocks/hardhat-fireblocks");
/** @type import(&#39;hardhat/config&#39;).HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
    url: "https://rpc.ankr.com/polygon_mumbai",
    fireblocks: {
      privateKey: "/Users/madhawaranaweera/Documents/Work/api_key/fireblocks_secret.key",
      apiKey: "4d9f02d4-de29-479c-9915-757225aae8d3",
      vaultAccountIds: ["10"],
    }
    },
  }
};