import type { NFTProfile } from "@/lib/nft-types";
import { StartupNFT } from "./StartupNFT";
import { CreatorNFT } from "./CreatorNFT";
import { CommunityNFT } from "./CommunityNFT";
import { ServiceProviderNFT } from "./ServiceProviderNFT";
import { InvestorNFT } from "./InvestorNFT";

interface IdentityNFTProps {
  profile: NFTProfile;
}

export function IdentityNFT({ profile }: IdentityNFTProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-75 blur"></div>
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
        <div className="text-center border-b border-neutral-800 pb-4 sm:pb-6 mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-800 mb-2 sm:mb-3">
            <span className="text-xl sm:text-2xl">🪪</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight">
            {profile.username}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">TREXION VERIFIED</p>
          <p className="text-xs text-neutral-500 mt-1">#{profile.tokenId}</p>
        </div>

        <div className="space-y-2 sm:space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-400">Type</span>
            <span className="text-white capitalize text-right ml-2">{profile.userType.replace("_", " ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Reputation</span>
            <span className="text-white font-mono">{profile.reputation}/100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Soulbound</span>
            <span className="text-green-400">Non-transferable</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Minted</span>
            <span className="text-white">{profile.mintedAt}</span>
          </div>
        </div>

        {profile.userType === "startup" && <StartupNFT profile={profile} />}
        {profile.userType === "creator" && <CreatorNFT profile={profile} />}
        {profile.userType === "community" && <CommunityNFT profile={profile} />}
        {profile.userType === "service_provider" && <ServiceProviderNFT profile={profile} />}
        {profile.userType === "investor" && <InvestorNFT profile={profile} />}
      </div>
    </div>
  );
}
