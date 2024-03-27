const fs = require('fs');
const path = require('path');
const { FireblocksSDK, PeerType } = require('fireblocks-sdk');
const { exit } = require('process');
const { inspect } = require('util');

const apiSecret = fs.readFileSync(path.resolve("/Users/madhawaranaweera/Documents/Work/api_key/fireblocks_secret.key"), "utf8");
const apiKey = "4d9f02d4-de29-479c-9915-757225aae8d3"
// Choose the right api url for your workspace type 
const baseUrl = "https://api.fireblocks.io";
const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

async function createVaultAccount(name){
    let vault = await fireblocks.createVaultAccount(name);
    console.log(JSON.stringify(vault, null, 2));
}

async function createVaultAsset(vaultId, asset){
    let vaultAsset = await fireblocks.createVaultAsset(vaultId, asset);
    console.log(JSON.stringify(vaultAsset, null, 2));
}

async function createTransaction(assetId, depositVaultId, omnibusId){
    const payload = {
        assetId: assetId,
        source: { 
            type: "VAULT_ACCOUNT",
            id: depositVaultId.toString() // **Id of iGreen23-[yourname]-1**
        },
        destination: {
            type: "VAULT_ACCOUNT",
            id: omnibusId.toString() // **Id of iGreen23-[yourname] Omnibus**
        },
        amount: 2,
        note: "iGreen23-madhawa: My first Sweep transaction"
    };
    const result = await fireblocks.createTransaction(payload);
    console.log(JSON.stringify(result, null, 2));
}

(async () => {

    // await createVaultAccount("iGreen23-madhawa-ombibus");
    // createVaultAsset(8, "USDC_ETH_TEST3_DUXQ");
    // createVaultAsset(8, "ETH_TEST3");
    // await createVaultAsset("iGreen23-madhawa-1");

    // createTransaction("USDC_ETH_TEST3_DUXQ", 7, 8);
    getVaultAccounts();

    // Print vaults before creation
    // let vaultAccounts = await fireblocks.getVa
    // console.log(inspect(vaultAccounts, false, null, true));

    // // Print vaults before creation
    // let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
    // console.log(inspect(vaultAccounts, false, null, true));

    // // Create vault account
    // const vaultCreation = await fireblocks.createVaultAccount("QuickStart_Vault");
    // console.log(inspect(vaultCreation, false, null, true));

    // // Print vaults after creation
    // vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
    // console.log(inspect(vaultAccounts, false, null, true));

})().catch((e)=>{
    console.error(`Failed: ${e}`);
    exit(-1);
})