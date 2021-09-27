## Aavegotchi interaction

This service will pet your [Aavegotchi](https://aavegotchi.com). Use it to increase your kinship level and pet your gotchi often.

### Join

This is a beta service and it might break. Follow the steps below to have your gotchi petted automatically by this autopetter.

AutoPetAddress: 0x183f37551d5986d5c2b324db351a21687c4dc307

- Send >1 MATIC donation to the AutoPetAddress (this should last 100 days at least)
- Set AutoPetAddress as a PetOperator for your gotchi (see below)
- Make a commit to this index.ts (or raise an issue) with your gotchi id and the tx hash of your donation

### PetOperator

You must approve the autopet as a PetOperator for your gotchi. You can approve a new PetOperator for your gotchi via the [AavegotchiFacet](https://louper.dev/?address=0x86935F11C86623deC8a25696E1C19a8659CbF95d&network=polygon) (you'll need to call `setPetOperatorForAll` directly on the diamond contract `0x86935f11c86623dec8a25696e1c19a8659cbf95d` which can be done via [louper.dev](https://louper.dev/?address=0x86935F11C86623deC8a25696E1C19a8659CbF95d&network=polygon)).

The PetOperator can't do anything else other than pet your gotchi. Take care when making transactions, dyor, not financial advice etc.

### Forking

The easiest way to run this script yourself is by forking the repo and running the action on Github. You could also run this script from the terminal or run it on a schedule (e.g. AWS lambda).

### Running via Github action

- Fork the repo
- Update the `TOKEN_IDS` variable in `index.js/ts` to include your gotchis
- Set a new secret on the repo called `PrivateKey` which is the private key of the PetOperator with funds to cover gas costs

### Running locally

- Set the following environment variables:

```bash
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
