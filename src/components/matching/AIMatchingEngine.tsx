"use client";

import { useState } from "react";
import type { MatchResult, NFTProfile, UserType } from "@/lib/nft-types";
import { mockNFTProfiles } from "@/lib/mock-data";
import { runAIMatching } from "@/lib/matching";
import { NFTBadge } from "../nft/NFTBadge";

const userTypeOptions: { value: UserType; label: string }[] = [
  { value: "creator", label: "Creator" },
  { value: "startup", label: "Startup" },
  { value: "community", label: "Community" },
  { value: "service_provider", label: "Service Provider" },
  { value: "investor", label: "Investor" },
];

export function AIMatchingEngine() {
  const [searchType, setSearchType] = useState<UserType>("creator");
  const [niche, setNiche] = useState("");
  const [minFollowers, setMinFollowers] = useState("");
  const [industry, setIndustry] = useState("");
  const [minCommunity, setMinCommunity] = useState("");
  const [minReputation, setMinReputation] = useState("");
  const [results, setResults] = useState<MatchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const query = {
      lookingFor: {
        [searchType]: {} as Record<string, unknown>,
      } as Record<UserType, Record<string, unknown>>,
      minReputation: minReputation ? Number.parseInt(minReputation, 10) : undefined,
      maxResults: 20,
    };

    if (searchType === "creator") {
      const criteria = query.lookingFor.creator;
      if (niche) criteria.niche = niche;
      if (minFollowers) criteria.minFollowers = Number.parseInt(minFollowers, 10);
    }

    if (searchType === "startup") {
      const criteria = query.lookingFor.startup;
      if (industry) criteria.industry = industry;
      if (minCommunity) criteria.minCommunity = Number.parseInt(minCommunity, 10);
    }

    const matched = runAIMatching(mockNFTProfiles, query);
    setResults(matched);
    setHasSearched(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">AI Matching Engine</h2>
        <p className="text-neutral-400 text-sm mb-5 sm:mb-6">
          Search for verified TREXION members by type, niche, or metrics. The AI ranks matches by
          relevance, reputation, and fit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1.5">Looking for</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as UserType)}
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
            >
              {userTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {searchType === "creator" && (
            <>
              <div>
                <label className="block text-sm text-neutral-400 mb-1.5">Niche</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Gaming, Tech, Art"
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1.5">Min Followers</label>
                <input
                  type="number"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(e.target.value)}
                  placeholder="10000"
                  min="0"
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
            </>
          )}

          {searchType === "startup" && (
            <>
              <div>
                <label className="block text-sm text-neutral-400 mb-1.5">Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Gaming, Fintech"
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1.5">Min Community Size</label>
                <input
                  type="number"
                  value={minCommunity}
                  onChange={(e) => setMinCommunity(e.target.value)}
                  placeholder="10000"
                  min="0"
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm text-neutral-400 mb-1.5">Min Reputation (0-100)</label>
            <input
              type="number"
              value={minReputation}
              onChange={(e) => setMinReputation(e.target.value)}
              placeholder="70"
              min="0"
              max="100"
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 text-white p-3 text-base placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[48px]"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="mt-5 sm:mt-6 w-full sm:w-auto px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors min-h-[48px]"
        >
          Find Matches
        </button>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {results.length > 0
              ? `${results.length} Match${results.length === 1 ? "" : "es"} Found`
              : "No matches found"}
          </h3>
          {results.length === 0 && (
            <p className="text-neutral-400 text-sm">
              Try broadening your search criteria or lowering the reputation threshold.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {results.map((result) => (
              <MatchCard key={result.profile.tokenId} result={result} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MatchCard({ result }: { result: MatchResult }) {
  const { profile, score, reasons } = result;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-5 shadow-lg hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-white font-medium truncate">{profile.username}</h4>
          <p className="text-xs text-neutral-500">#{profile.tokenId}</p>
        </div>
        <NFTBadge userType={profile.userType} size="sm" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Reputation</span>
          <span className="text-white font-mono">{profile.reputation}/100</span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-1.5">
          <div
            className="bg-purple-500 h-1.5 rounded-full"
            style={{ width: `${profile.reputation}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Match Score</span>
          <span className="text-purple-400 font-mono">{score}%</span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
            style={{ width: `${Math.min(score, 100)}%` }}
          ></div>
        </div>
        {reasons.length > 0 && (
          <ul className="space-y-1 mt-2">
            {reasons.slice(0, 3).map((reason, i) => (
              <li key={i} className="text-xs text-neutral-400 flex items-start">
                <span className="text-purple-400 mr-1">•</span>
                {reason}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
