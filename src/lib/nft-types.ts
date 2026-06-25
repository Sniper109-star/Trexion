export type UserType = "startup" | "creator" | "community" | "service_provider" | "investor";

export interface BaseNFTProfile {
  tokenId: number;
  walletAddress: string;
  userType: UserType;
  username: string;
  reputation: number;
  mintedAt: string;
  isSoulbound: boolean;
}

export interface StartupNFTProfile extends BaseNFTProfile {
  userType: "startup";
  industry: string;
  fundingStage: string;
  communitySize: number;
  website: string;
  objectives: string[];
}

export interface CreatorNFTProfile extends BaseNFTProfile {
  userType: "creator";
  socialAccounts: { platform: string; handle: string }[];
  niche: string;
  audienceSize: number;
  engagement: number;
}

export interface CommunityNFTProfile extends BaseNFTProfile {
  userType: "community";
  members: number;
  topics: string[];
  region: string;
  activity: "high" | "medium" | "low";
}

export interface ServiceProviderNFTProfile extends BaseNFTProfile {
  userType: "service_provider";
  skills: string[];
  portfolio: { title: string; url: string }[];
  reviews: { from: string; rating: number; comment: string }[];
  verified: boolean;
}

export interface InvestorNFTProfile extends BaseNFTProfile {
  userType: "investor";
  interests: string[];
  ticketSize: { min: number; max: number };
  sectorFocus: string[];
}

export type NFTProfile =
  | StartupNFTProfile
  | CreatorNFTProfile
  | CommunityNFTProfile
  | ServiceProviderNFTProfile
  | InvestorNFTProfile;

export interface MatchQuery {
  lookingFor: Partial<Record<UserType, Record<string, unknown>>>;
  minReputation?: number;
  maxResults?: number;
}

export interface MatchResult {
  profile: NFTProfile;
  score: number;
  reasons: string[];
}
