import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

// Add the recipient public key here.
const recipient = new PublicKey("Dyzvjp4tWNxrYanJBSw1sxqSiD7o7XWr4cNL96WqwHXo");

// Subtitute in your token mint account
const tokenMintAccount = new PublicKey("7qy2JDJ7XvtTGxWypKZK8NFxSV6ttrmdiZLpchgExHj7");

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

console.log(`💸 Attempting to send 1 token to ${recipient.toBase58()}...`);

// Get or create the source and destination token accounts to store this token
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  sender.publicKey
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  tokenMintAccount,
  recipient
);

// Transfer the tokens
const signature = await transfer(
  connection,
  sender,
  sourceTokenAccount.address,
  destinationTokenAccount.address,
  sender,
  1 * MINOR_UNITS_PER_MAJOR_UNITS
);

const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}!`);

const explorerLink2 = getExplorerLink("address", destinationTokenAccount.address.toBase58(), "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink2}!`);