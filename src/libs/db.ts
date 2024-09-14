import Dexie, {type EntityTable} from "dexie";

import type {IBloggerInfo} from "~src/libs/BloggerInfo";

const db = new Dexie('BloggerDB') as Dexie & {
  bloggerInfo: EntityTable<IBloggerInfo, "userId">,
  notesRate: EntityTable<any, 'userId'>
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

export {db}