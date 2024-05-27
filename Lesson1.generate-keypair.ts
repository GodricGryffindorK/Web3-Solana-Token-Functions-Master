import { Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

import "dotenv/config"

const keypair = Keypair.generate();
console.log('public', keypair.publicKey.toBase58());
console.log('secret', keypair.secretKey);
// const keypair = getKeypairFromEnvironment("SECRET_KEY");
// console.log('finished');