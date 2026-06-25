"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { currentUserProfile } from "@/lib/mock-data";
import { IdentityNFT } from "@/components/nft/IdentityNFT";
import { fetchNftMetadata } from "@/lib/solana-nft";

export default function ProfilePage() {
  const [mintAddress, setMintAddress] = useState("");
  const [fetched, setFetched] = useState<null | { name: string; uri: string; sellerFeeBasisPoints: number }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNftMetadata(mintAddress);
      setFetched(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch NFT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Identity NFT</h1>
          <p className="text-neutral-400 mt-2">
            This is your soulbound onchain profile. It cannot be transferred and represents your
            verified identity in the TREXION ecosystem.
          </p>
        </div>

        <div className="mb-10 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Lookup Onchain NFT</h2>
          <form onSubmit={handleFetch} className="flex gap-3">
            <input
              type="text"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              placeholder="Enter mint address"
              className="flex-1 rounded-lg bg-neutral-800 border border-neutral-700 text-white p-2.5 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Fetching..." : "Fetch"}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {fetched && (
            <div className="mt-4 bg-neutral-800 rounded-lg p-4 text-sm space-y-2">
              <div>
                <span className="text-neutral-400">Name:</span>{" "}
                <span className="text-white">{fetched.name}</span>
              </div>
              <div>
                <span className="text-neutral-400">URI:</span>{" "}
                <span className="text-white break-all">{fetched.uri}</span>
              </div>
              <div>
                <span className="text-neutral-400">Seller Fee:</span>{" "}
                <span className="text-white">{fetched.sellerFeeBasisPoints / 100}%</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <IdentityNFT profile={currentUserProfile} />
        </div>
      </main>
    </div>
  );
}
