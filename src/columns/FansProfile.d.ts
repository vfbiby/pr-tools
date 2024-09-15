import type {IBloggerInfo} from "~src/columns/BloggerInfo";

export type FansProfileAge = { group: string; percent: number }
export type FansProfileInterest = { name: string; percent: number }
export type FansProfileProvince = { name: string; percent: number }
export type FansProfileCity = { name: string; percent: number }
export type FansProfileDevice = { name: string; desc: string; percent: number }
type FansProfileGender = { male: number, female: number };

export type FansProfile = {
  "userId": string;
  "createdAt": Date;
  "blogger": IBloggerInfo;
  "ages": FansProfileAge[],
  "gender": FansProfileGender,
  "interests": FansProfileInterest[],
  "provinces": FansProfileProvince[],
  "cities": FansProfileCity[],
  "devices": FansProfileDevice[],
  "dateKey": string
}
