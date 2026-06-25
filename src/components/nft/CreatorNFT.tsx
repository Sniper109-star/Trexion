import type { CreatorNFTProfile } from "@/lib/nft-types";

interface CreatorNFTProps {
  profile: CreatorNFTProfile;
}

export function CreatorNFT({ profile }: CreatorNFTProps) {
  return (
    <div className="border-t border-blue-800 pt-4 mt-4 space-y-3 text-sm">
      <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
        Creator Details
      </h3>
      <div>
        <span className="text-blue-200 block mb-1">Social Accounts</span>
        <ul className="space-y-1">
          {profile.socialAccounts.map((account, i) => (
            <li key={i} className="text-white">
              {account.platform}: <span className="text-blue-400">{account.handle}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
        <span className="text-blue-200">Niche</span>
        <span className="text-white">{profile.niche}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
        <span className="text-blue-200">Audience Size</span>
        <span className="text-white">{profile.audienceSize.toLocaleString()}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
        <span className="text-blue-200">Engagement</span>
        <span className="text-white">{profile.engagement}%</span>
      </div>
    </div>
  );
}
