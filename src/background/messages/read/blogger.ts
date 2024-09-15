import type {MessagesMetadata, PlasmoMessaging} from "@plasmohq/messaging";
import {typeDBMap} from "~src/background/messages/save/blogger";

const handler: PlasmoMessaging.MessageHandler = async (
  req: PlasmoMessaging.Request<keyof MessagesMetadata, { type: string }>,
  res) => {

  const data = await typeDBMap[req.body.type].toArray();

  res.send({
    data: data
  })
}

export default handler
