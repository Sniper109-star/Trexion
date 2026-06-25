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
    <div className="min-h-screen bg-blue-950 text-white">
      <Header />
      <main className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Your Identity NFT</h1>
          <p className="text-blue-200 mt-2 text-sm sm:text-base">
            This is your soulbound onchain profile. It cannot be transferred and represents your
            verified identity in the TREXION ecosystem.
          </p>
        </div>

        <div className="mb-6 sm:mb-8 lg:mb-10 bg-blue-900 border border-blue-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Lookup Onchain NFT</h2>
          <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              placeholder="Enter mint address"
              className="flex-1 rounded-lg bg-blue-800 border border-blue-700 text-white p-3 text-base placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[48px]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors disabled:opacity-50 min-h-[48px] w-full sm:w-auto"
            >
              {loading ? "Fetching..." : "Fetch"}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {fetched && (
            <div className="mt-4 bg-blue-800 rounded-lg p-4 text-sm space-y-2">
              <div>
                <span className="text-blue-200">Name:</span>{" "}
                <span className="text-white">{fetched.name}</span>
              </div>
              <div>
                <span className="text-blue-200">URI:</span>{" "}
                <span className="text-white break-all">{fetched.uri}</span>
              </div>
              <div>
                <span className="text-blue-200">Seller Fee:</span>{" "}
                <span className="text-white">{fetched.sellerFeeBasisPoints / 100}%</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm">
            <IdentityNFT profile={currentUserProfile} />
          </div>
        </div>
      </main>
    </div>
  );
}
