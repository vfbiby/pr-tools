import type {MessagesMetadata, PlasmoMessaging} from "@plasmohq/messaging";
import {typeDBMap} from "~src/background/messages/save/blogger";
import type {EntityTable} from "dexie";

const handler: PlasmoMessaging.MessageHandler = async (
  req: PlasmoMessaging.Request<keyof MessagesMetadata, { type: string, ids: string[] }>,
  res: PlasmoMessaging.Response<{ data: number }>) => {

  const data = await (typeDBMap[req.body.type] as EntityTable<any, 'userId'>)
    .where('userId').anyOf(req.body.ids).delete();

  res.send({data})
}

export default handler
