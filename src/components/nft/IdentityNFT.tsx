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
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-75 blur"></div>
      <div className="relative bg-blue-900 border border-blue-800 rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl">
        <div className="text-center border-b border-blue-800 pb-3 sm:pb-4 lg:pb-6 mb-3 sm:mb-4 lg:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-blue-800 mb-2 sm:mb-3">
            <span className="text-lg sm:text-xl lg:text-2xl">🪪</span>
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white font-mono tracking-tight">
            {profile.username}
          </h1>
          <p className="text-xs text-blue-200 mt-1">TREXION VERIFIED</p>
          <p className="text-xs text-blue-300 mt-1">#{profile.tokenId}</p>
        </div>

        <div className="space-y-2 sm:space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
            <span className="text-blue-200">Type</span>
            <span className="text-white capitalize sm:text-right">{profile.userType.replace("_", " ")}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
            <span className="text-blue-200">Reputation</span>
            <span className="text-white font-mono sm:text-right">{profile.reputation}/100</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
            <span className="text-blue-200">Soulbound</span>
            <span className="text-green-400 sm:text-right">Non-transferable</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
            <span className="text-blue-200">Minted</span>
            <span className="text-white sm:text-right">{profile.mintedAt}</span>
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
