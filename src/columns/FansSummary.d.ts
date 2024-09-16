import type {IBloggerInfo} from "~src/columns/BloggerInfo";

export type FansSummary = {
  "userId": string;
  "createdAt": Date;
  "blogger": IBloggerInfo;
  "fansNum": number;
  "fansIncreaseNum": number;
  "fansGrowthRate": string;
  "fansGrowthBeyondRate": string;
  "activeFansL28": number;
  "activeFansRate": string;
  "activeFansBeyondRate": string;
  "engageFansRate": string;
  "engageFansL30": number;
  "engageFansBeyondRate": string;
  "readFansIn30": number;
  "readFansRate": string;
  "readFansBeyondRate": string;
  "payFansUserRate30d": string;
  "payFansUserNum30d": number;
}