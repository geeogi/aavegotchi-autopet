"use strict";
exports.__esModule = true;
var core = require("@actions/core");
var ethers_1 = require("ethers");
var RPC_ENDPOINT = "https://polygon-rpc.com";
var TOKEN_IDS = [7988];
var PRIVATE_KEY = process.env.PRIVATE_KEY;
/*
 * Aavegotchi diamond ABI
 *
 * https://polygonscan.com/address/0xfa7a3bb12848a7856dd2769cd763310096c053f1
 */
var abi = ["function interact(uint256[] _tokenIds)"];
/*
 * Aavegotchi diamond instance
 *
 * https://polygonscan.com/address/0x86935F11C86623deC8a25696E1C19a8659CbF95d
 */
var contractAddress = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
console.log("now petting: " + TOKEN_IDS.join(","));
/*
 * Create Ethers contract instance with signer
 */
var provider = new ethers_1.ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
provider.ready.then(function () {
    console.log("provider is ready");
    var contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
    var wallet = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
    var contractWithSigner = contract.connect(wallet);
    var options = {
        gasLimit: 88000,
        gasPrice: ethers_1.ethers.utils.parseUnits("12.0", "gwei")
    };
    contractWithSigner
        .interact(TOKEN_IDS, options)
        .then(function (tx) {
        console.log("tx sent: " + tx.hash);
        core.setOutput("tx", tx.hash);
        // The operation is NOT complete yet; we must wait until it is mined
        tx.wait()
            .then(function (receipt) {
            console.log("status: " + receipt.status);
        })["catch"](function (e) {
            console.error(e);
            core.setFailed(e);
        });
    })["catch"](function (e) {
        console.error(e);
        core.setFailed(e);
    });
});
