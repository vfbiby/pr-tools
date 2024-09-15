type NoteType = { contentTag: string, percent: string }

type Note = {
  "noteId": string;
  "publishTime": string;
  "type": number;
  "imgUrl": string;
  "title": string;
  "canJump": boolean;
  "impNum": number;
  "impBeyondRate": number;
  "readNum": number;
  "readBeyondRate": number;
  "interactionNum": number;
  "interactionBeyondRate": number;
  "collectNum": number;
  "likeNum": number;
  "collectBeyondRate": number;
  "likeBeyondRate": number;
}

type NotesRate = {
  "userId": string;
  "createdAt": Date;
  "noteNumber": number;
  "videoNoteNumber": number;
  "hundredLikePercent": string;
  "thousandLikePercent": string;
  "noteType": NoteType[],
  "impMedian": number;
  "impMedianBeyondRate": string;
  "readMedian": number;
  "readMedianBeyondRate": string;
  "interactionMedian": number;
  "interactionRate": string;
  "interactionBeyondRate": string;
  "likeMedian": number;
  "collectMedian": number;
  "commentMedian": number;
  "shareMedian": number;
  "videoFullViewRate": string;
  "videoFullViewBeyondRate": string;
  "picture3sViewRate": string;
  "notes": Note[],
  "pagePercentVo": {
    "impHomefeedPercent": number;
    "impSearchPercent": number;
    "impFollowPercent": number;
    "impDetailPercent": number;
    "impNearbyPercent": number;
    "impOtherPercent": number;
    "readHomefeedPercent": number;
    "readSearchPercent": number;
    "readFollowPercent": number;
    "readDetailPercent": number;
    "readNearbyPercent": number;
    "readOtherPercent": number;
  },
  "mEngagementNum": number;
  "mFollowCnt": number;
}