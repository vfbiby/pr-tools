import Dexie, {type EntityTable} from "dexie";
import type {IBloggerInfo} from "~src/contents/blogger-float";

const db = new Dexie('BloggerDB') as Dexie & {
  bloggerInfo: EntityTable<IBloggerInfo, "userId">
};

db.version(1).stores({
  bloggerInfo: '++userId, name, gender, fansCount, likeCollectCountInfo, featureTags'
})

export {db}