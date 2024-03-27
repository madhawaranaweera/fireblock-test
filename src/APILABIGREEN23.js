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
    console.log(vault);
}
async function createVaultAsset(vaultAsset, vaultId){
    let vaultasset = await fireblocks.createVaultAsset(vaultAsset, vaultId);
    console.log(vaultasset);
}

async function createTransaction(){
    const payload = {
        assetId: "ETH_TEST5",
        source: {
            type: PeerType.VAULT_ACCOUNT,
            id: "4"
        },
        destination: {
            type: PeerType.VAULT_ACCOUNT,
            id: "6",
        },
        amount: 0.001,
        note: "iGreen23-madhawa: My first Sweep transaction"
        
    };
    const result = await fireblocks.createTransaction(payload);
    console.log(JSON.stringify(result, null, 2));
}

async function getVaultAccounts(){
    getVaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({namePrefix:
        "iGreen23-madhawa", assetId: "ETH_TEST3"});
        console.log(getVaultAccounts);
    }

(async () => {

    // await createVaultAccount("iGreen23-madhawa-2");
    // createVaultAsset(6, "ETH_TEST5");
    // await createVaultAsset("iGreen23-madhawa-1");

    // createTransaction();
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