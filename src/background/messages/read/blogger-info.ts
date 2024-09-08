import type {PlasmoMessaging} from "@plasmohq/messaging"
import {db} from "~src/libs/db";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  const data = await db.bloggerInfo.toArray();

  res.send({
    data: data
  })
}

export default handler
