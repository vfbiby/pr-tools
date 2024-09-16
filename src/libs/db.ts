import Dexie, {type EntityTable} from "dexie";

import type {BloggerInfo} from "~src/columns/BloggerInfo";
import type {NotesRate} from "~src/columns/NotesRate";
import type {FansProfile} from "~src/columns/FansProfile";
import type {FansSummary} from "~src/columns/FansSummary";

const db = new Dexie('BloggerDB') as Dexie & {
  bloggerInfo: EntityTable<BloggerInfo, "userId">,
  notesRate: EntityTable<NotesRate, 'userId'>,
  fansProfile: EntityTable<FansProfile, 'userId'>,
  fansSummary: EntityTable<FansSummary, 'userId'>,
};

db.version(2).stores({
  bloggerInfo: '++userId, name, gender, fansCount, likeCollectCountInfo, featureTags'
}).upgrade(tx => {
  return tx.table('bloggerInfo').toCollection().modify(blogger => {
    blogger.createdAt = new Date()
  })
})

db.version(3).stores({
  notesRate: '++userId'
})

db.version(4).stores({
  fansProfile: '++userId'
})

db.version(5).stores({
  fansSummary: '++userId'
})

export {db}