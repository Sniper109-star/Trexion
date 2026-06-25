"use client";

import {
  createSolanaRpc,
  generateKeyPairSigner,
  sendTransactionWithoutConfirmingFactory,
  devnet,
} from "@solana/kit";
import { createNft, fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata-kit";
import {
  createTransactionMessage,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstruction,
} from "@solana/transaction-messages";
import { compileTransaction, signTransaction, getBase64EncodedWireTransaction } from "@solana/transactions";
import { address } from "@solana/addresses";

export type MintResult = {
  signature: string;
  mintAddress: string;
  name: string;
  uri: string;
};

export async function mintIdentityNft({
  name,
  uri,
  sellerFeeBasisPoints,
}: {
  name: string;
  uri: string;
  sellerFeeBasisPoints?: number;
}): Promise<MintResult> {
  const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
  const mint = await generateKeyPairSigner();
  const authority = await generateKeyPairSigner();

  const [createIx, mintIx] = await createNft({
    mint,
    authority,
    payer: authority,
    name,
    uri,
    sellerFeeBasisPoints: sellerFeeBasisPoints ?? 500,
    tokenOwner: authority.address,
  });

  const { value: blockhash } = await rpc.getLatestBlockhash({ commitment: "confirmed" }).send();

  let message: any = createTransactionMessage({ version: 0 });
  message = setTransactionMessageFeePayer(address(authority.address), message);
  message = setTransactionMessageLifetimeUsingBlockhash(blockhash, message);
  message = appendTransactionMessageInstruction(createIx, message);
  message = appendTransactionMessageInstruction(mintIx, message);

  const transaction = compileTransaction(message);
  const signedTx = await signTransaction([mint.keyPair, authority.keyPair], transaction) as any;

  const sendTx = sendTransactionWithoutConfirmingFactory({ rpc });
  await sendTx(signedTx as any, { commitment: "confirmed" });

  return {
    signature: getBase64EncodedWireTransaction(signedTx),
    mintAddress: mint.address,
    name,
    uri,
  };
}

export async function fetchNftMetadata(mintAddress: string) {
  const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
  const asset = await fetchDigitalAsset(rpc, address(mintAddress));
  return {
    name: asset.metadata.name,
    uri: asset.metadata.uri,
    sellerFeeBasisPoints: asset.metadata.sellerFeeBasisPoints,
  };
}
