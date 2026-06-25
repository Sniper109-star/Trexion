import type { NFTProfile, MatchQuery, MatchResult, UserType } from "./nft-types";

function calculateMatchScore(profile: NFTProfile, query: MatchQuery): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const minReputation = query.minReputation ?? 0;
  if (profile.reputation >= minReputation) {
    score += 20;
    reasons.push(`Reputation ${profile.reputation}/100 meets threshold`);
  } else {
    score -= 10;
  }

  const criteria = query.lookingFor[profile.userType];
  if (!criteria) {
    return { score, reasons: [...reasons, "User type unmatched"] };
  }

  if (profile.userType === "creator") {
    const creator = profile as Extract<NFTProfile, { userType: "creator" }>;
    if ("niche" in criteria && creator.niche.toLowerCase().includes((criteria.niche as string).toLowerCase())) {
      score += 30;
      reasons.push(`Niche match: ${creator.niche}`);
    }
    if ("minFollowers" in criteria && creator.audienceSize >= (criteria.minFollowers as number)) {
      score += 25;
      reasons.push(`Followers ${creator.audienceSize.toLocaleString()} >= ${(criteria.minFollowers as number).toLocaleString()}`);
    }
    if ("minEngagement" in criteria && creator.engagement >= (criteria.minEngagement as number)) {
      score += 15;
      reasons.push(`Engagement ${creator.engagement}% meets threshold`);
    }
  }

  if (profile.userType === "startup") {
    const startup = profile as Extract<NFTProfile, { userType: "startup" }>;
    if ("industry" in criteria && startup.industry.toLowerCase().includes((criteria.industry as string).toLowerCase())) {
      score += 30;
      reasons.push(`Industry match: ${startup.industry}`);
    }
    if ("minCommunity" in criteria && startup.communitySize >= (criteria.minCommunity as number)) {
      score += 25;
      reasons.push(`Community size ${startup.communitySize.toLocaleString()} meets threshold`);
    }
    if ("fundingStage" in criteria && startup.fundingStage === (criteria.fundingStage as string)) {
      score += 15;
      reasons.push(`Funding stage: ${startup.fundingStage}`);
    }
  }

  if (profile.userType === "community") {
    const community = profile as Extract<NFTProfile, { userType: "community" }>;
    if ("minMembers" in criteria && community.members >= (criteria.minMembers as number)) {
      score += 25;
      reasons.push(`Members ${community.members.toLocaleString()} meets threshold`);
    }
    if ("region" in criteria && community.region.toLowerCase() === (criteria.region as string).toLowerCase()) {
      score += 20;
      reasons.push(`Region match: ${community.region}`);
    }
    if ("activity" in criteria && community.activity === (criteria.activity as "high" | "medium" | "low")) {
      score += 20;
      reasons.push(`Activity level: ${community.activity}`);
    }
  }

  if (profile.userType === "service_provider") {
    const sp = profile as Extract<NFTProfile, { userType: "service_provider" }>;
    if ("skills" in criteria && Array.isArray(criteria.skills)) {
      const required = criteria.skills as string[];
      const matched = required.filter((s) => sp.skills.some((skill) => skill.toLowerCase().includes(s.toLowerCase())));
      if (matched.length > 0) {
        score += matched.length * 10;
        reasons.push(`Skills matched: ${matched.join(", ")}`);
      }
    }
    if ("verified" in criteria && sp.verified === (criteria.verified as boolean)) {
      score += 15;
      reasons.push(sp.verified ? "Verified provider" : "Unverified provider");
    }
  }

  if (profile.userType === "investor") {
    const investor = profile as Extract<NFTProfile, { userType: "investor" }>;
    if ("sectorFocus" in criteria && Array.isArray(criteria.sectorFocus)) {
      const requested = criteria.sectorFocus as string[];
      const matched = requested.filter((s) => investor.sectorFocus.some((focus) => focus.toLowerCase().includes(s.toLowerCase())));
      if (matched.length > 0) {
        score += matched.length * 10;
        reasons.push(`Sector focus matched: ${matched.join(", ")}`);
      }
    }
    if ("minTicket" in criteria && investor.ticketSize.max >= (criteria.minTicket as number)) {
      score += 20;
      reasons.push(`Ticket size up to $${investor.ticketSize.max.toLocaleString()} meets threshold`);
    }
  }

  return { score, reasons };
}

export function runAIMatching(profiles: NFTProfile[], query: MatchQuery): MatchResult[] {
  const results: MatchResult[] = profiles
    .map((profile) => {
      const { score, reasons } = calculateMatchScore(profile, query);
      return { profile, score, reasons };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  const maxResults = query.maxResults ?? 10;
  return results.slice(0, maxResults);
}

export function searchByType(profiles: NFTProfile[], userType: UserType): NFTProfile[] {
  return profiles.filter((p) => p.userType === userType);
}
