import * as core from "@actions/core";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";

const TOKEN_IDS = [
  7988,
  // <YOUR_GOTCHI_TOKEN_ID_HERE>
];

const RPC_ENDPOINT = "https://polygon-rpc.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/*
 * Aavegotchi diamond ABI
 *
 * https://polygonscan.com/address/0xfa7a3bb12848a7856dd2769cd763310096c053f1
 */
const abi = ["function interact(uint256[] _tokenIds)"];

/*
 * Aavegotchi diamond instance
 *
 * https://polygonscan.com/address/0x86935F11C86623deC8a25696E1C19a8659CbF95d
 */
const contractAddress = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";

console.log(`now petting: ${TOKEN_IDS.join(",")}`);

/*
 * Create Ethers contract instance with signer
 */
const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);

provider.ready.then(() => {
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contractWithSigner = contract.connect(wallet);

  const options = {
    gasLimit: 88000,
    gasPrice: ethers.utils.parseUnits("12.0", "gwei"),
  };

  contractWithSigner
    .interact(TOKEN_IDS, options)
    .then((tx: TransactionResponse) => {
      console.log(`tx sent: ${tx.hash}`);
      core.setOutput("tx", tx.hash);

      // The operation is NOT complete yet; we must wait until it is mined
      tx.wait()
        .then((receipt) => {
          console.log(`status: ${receipt.status}`);
        })
        .catch((e: any) => {
          console.error(e);
          throw new Error(e);
        });
    })
    .catch((e: any) => {
      console.error(e);
      throw new Error(e);
    });
});
