## Aavegotchi interaction

This script will pet your Aavegotchi. Use it to increase your kinship level and pet your gotchi often. You can run this script from the terminal or run it on a schedule (e.g. AWS lambda).

### Guide

You must provide a private key for an address which is an approved PetOperator for the gotchi token ids. You can approve a new PetOperator for your gotchi via the [AavegotchiFacet](https://louper.dev/?address=0x86935F11C86623deC8a25696E1C19a8659CbF95d&network=polygon) (you'll need to call `setPetOperatorForAll` directly on the diamond contract `0x86935f11c86623dec8a25696e1c19a8659cbf95d` which can be done via [louper.dev](https://louper.dev/?address=0x86935F11C86623deC8a25696E1C19a8659CbF95d&network=polygon)).

Set the following environment variables:

```bash
RPC_ENDPOINT=https://polygon-rpc.com
TOKEN_IDS=3456,7865,4367 # ids of the gotchis to pet
PRIVATE_KEY=0x46453... # private key of the pet operator with funds to cover gas costs
```

### Compilation

Use TSC to compile `index.ts` to javascript:

```
yarn tsc index.ts
```

### Run

Run the script with node:

```
node index.js
```
