"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { NFTBadge } from "@/components/nft/NFTBadge";
import { mintIdentityNft } from "@/lib/solana-nft";
import type { UserType } from "@/lib/nft-types";

const userTypeOptions: { value: UserType; label: string }[] = [
  { value: "startup", label: "Startup" },
  { value: "creator", label: "Creator" },
  { value: "community", label: "Community" },
  { value: "service_provider", label: "Service Provider" },
  { value: "investor", label: "Investor" },
];

type MintStatus = "idle" | "minting" | "success" | "error";

export default function MintPage() {
  const [formData, setFormData] = useState({
    userType: "creator" as UserType,
    username: "",
    industry: "",
    fundingStage: "",
    communitySize: "",
    website: "",
    niche: "",
    audienceSize: "",
    engagement: "",
    members: "",
    topics: "",
    region: "",
    activity: "medium" as "high" | "medium" | "low",
    skills: "",
    portfolio: "",
    reviews: "",
    verified: false,
    interests: "",
    ticketMin: "",
    ticketMax: "",
    sectorFocus: "",
    objectives: "",
    reputation: 85,
  });

  const [status, setStatus] = useState<MintStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ mintAddress: string; signature: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value =
      target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({
      ...prev,
      [target.name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("minting");
    setError(null);
    try {
      const res = await mintIdentityNft({
        name: formData.username || `TREXION ${formData.userType}`,
        uri: "https://example.com/trexion-nft.json",
        sellerFeeBasisPoints: 500,
      });
      setResult({ mintAddress: res.mintAddress, signature: res.signature });
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Minting failed");
      setStatus("error");
    }
  };

  if (status === "success" && result) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-neutral-900 border border-green-500/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-white mb-2">NFT Minted Successfully</h2>
            <p className="text-neutral-400">
              Your TREXION Identity NFT has been minted on Solana devnet.
            </p>
            <div className="mt-6 text-left bg-neutral-800 rounded-lg p-4 space-y-2 font-mono text-sm">
              <div>
                <span className="text-neutral-400">Mint Address:</span>
                <span className="text-white ml-2 break-all">{result.mintAddress}</span>
              </div>
              <div>
                <span className="text-neutral-400">Signature:</span>
                <span className="text-white ml-2 break-all">{result.signature}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setStatus("idle");
                setResult(null);
                setFormData((prev) => ({ ...prev, username: "" }));
              }}
              className="mt-6 px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"
            >
              Mint Another
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Mint Your Identity NFT</h1>
          <p className="text-neutral-400 mt-2 text-sm sm:text-base">
            Create your soulbound onchain profile. Once minted, this NFT cannot be transferred and
            will serve as your verifiable identity in the TREXION ecosystem powered by Solana.
          </p>
        </div>

        {status === "error" && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">General Information</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                placeholder="Your display name"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {userTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formData.userType === "startup" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Startup Details</h2>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                  placeholder="e.g. Gaming"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Funding Stage</label>
                <input
                  type="text"
                  name="fundingStage"
                  value={formData.fundingStage}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                  placeholder="e.g. Seed, Series A"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Community Size</label>
                <input
                  type="number"
                  name="communitySize"
                  value={formData.communitySize}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Objectives (comma-separated)</label>
                <textarea
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
            </div>
          )}

          {formData.userType === "creator" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Creator Details</h2>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Niche</label>
                <input
                  type="text"
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                  placeholder="e.g. Gaming"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Audience Size</label>
                <input
                  type="number"
                  name="audienceSize"
                  value={formData.audienceSize}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Engagement (%)</label>
                <input
                  type="number"
                  name="engagement"
                  value={formData.engagement}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
            </div>
          )}

          {formData.userType === "community" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Community Details</h2>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Members</label>
                <input
                  type="number"
                  name="members"
                  value={formData.members}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Topics (comma-separated)</label>
                <input
                  type="text"
                  name="topics"
                  value={formData.topics}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Region</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Activity</label>
                <select
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          )}

          {formData.userType === "service_provider" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Service Provider Details</h2>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Skills (comma-separated)</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Portfolio (title,url per line)</label>
                <textarea
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-neutral-800 border-neutral-700 text-purple-600 focus:ring-purple-500"
                />
                <label className="text-sm text-neutral-300">I am a verified service provider</label>
              </div>
            </div>
          )}

          {formData.userType === "investor" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Investor Details</h2>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Interests (comma-separated)</label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Min Ticket Size ($)</label>
                  <input
                    type="number"
                    name="ticketMin"
                    value={formData.ticketMin}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Max Ticket Size ($)</label>
                  <input
                    type="number"
                    name="ticketMax"
                    value={formData.ticketMax}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Sector Focus (comma-separated)</label>
                <input
                  type="text"
                  name="sectorFocus"
                  value={formData.sectorFocus}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
            </div>
          )}

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">Reputation</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Initial Reputation Score</label>
              <input
                type="number"
                name="reputation"
                value={formData.reputation}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "minting"}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "minting" ? "Minting on Solana..." : "Mint Identity NFT"}
          </button>
        </form>
      </main>
    </div>
  );
}
