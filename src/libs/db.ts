import Dexie, {type EntityTable} from "dexie";

import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import type {NotesRate} from "~src/columns/NotesRate";
import type {FansProfile} from "~src/columns/FansProfile";

const db = new Dexie('BloggerDB') as Dexie & {
  bloggerInfo: EntityTable<IBloggerInfo, "userId">,
  notesRate: EntityTable<NotesRate, 'userId'>,
  fansProfile: EntityTable<FansProfile, 'userId'>,
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

export {db}