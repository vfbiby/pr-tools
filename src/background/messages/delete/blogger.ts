import type {MessagesMetadata, PlasmoMessaging} from "@plasmohq/messaging";
import {typeDBMap} from "~src/background/messages/save/blogger";
import type {EntityTable} from "dexie";
import {db} from "~src/libs/db";

const handler: PlasmoMessaging.MessageHandler = async (
  req: PlasmoMessaging.Request<keyof MessagesMetadata, { tables: string | string[], ids: string[] }>,
  res: PlasmoMessaging.Response<{ data: number }>) => {

  let data: number = 0;
  const tables = req.body.tables;

  db.transaction('rw', db.bloggerInfo, db.notesRate, db.fansProfile, db.fansSummary, async () => {
    if (!Array.isArray(tables)) {
      data = await (typeDBMap[tables] as EntityTable<any, 'userId'>)
        .where('userId').anyOf(req.body.ids).delete();
    } else {
      for (const table of tables) {
        data += await (typeDBMap[table] as EntityTable<any, 'userId'>)
          .where('userId').anyOf(req.body.ids).delete();
      }
    }
  }).then(() => {
    res.send({data})
  }).catch(err => {
    res.send({data: -1})
  })

}

export default handler
