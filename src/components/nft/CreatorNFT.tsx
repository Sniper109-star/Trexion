import type { CreatorNFTProfile } from "@/lib/nft-types";

interface CreatorNFTProps {
  profile: CreatorNFTProfile;
}

export function CreatorNFT({ profile }: CreatorNFTProps) {
  return (
    <div className="border-t border-neutral-800 pt-4 mt-4 space-y-3 text-sm">
      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        Creator Details
      </h3>
      <div>
        <span className="text-neutral-400 block mb-1">Social Accounts</span>
        <ul className="space-y-1">
          {profile.socialAccounts.map((account, i) => (
            <li key={i} className="text-white">
              {account.platform}: <span className="text-blue-400">{account.handle}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-400">Niche</span>
        <span className="text-white">{profile.niche}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-400">Audience Size</span>
        <span className="text-white">{profile.audienceSize.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-400">Engagement</span>
        <span className="text-white">{profile.engagement}%</span>
      </div>
    </div>
  );
}
