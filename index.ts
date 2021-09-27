import * as core from "@actions/core";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";

/*
 * IGNORE THIS MESSAGE IF YOU'RE FORKING THIS REPO
 *
 * IF YOU'D LIKE TO HAVE YOUR GOTCHI PETTED BY THIS AUTOPETTER THEN:
 *
 * AutoPetAddress = 0x183f37551d5986d5c2b324db351a21687c4dc307
 *
 * 1) Send >1 MATIC donation to the AutoPetAddress
 * 2) Set AutoPetAddress as a PetOperator for your gotchi (see README)
 * 3) Make a commit to this file (or raise an issue) with the following:
 *    - Your gotchi ID
 *    - The donation TX
 */
const TOKEN_IDS = [
  7988, // 0x377f08b6339686f4d4f342e74e2aaf2f360aacb397b48e728b3c6366f9bc4326
  // <YOUR_GOTCHI_TOKEN_ID_HERE>, // <YOUR_DONATION_TX>
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
