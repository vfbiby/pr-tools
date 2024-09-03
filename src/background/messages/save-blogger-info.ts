import type {PlasmoMessaging} from "@plasmohq/messaging"
import {db} from "~src/libs/db";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  let id: string;
  let message: string
  try {
    id = await db.bloggerInfo.add(req.body.blogger);
    message = `saved blogger info with id ${id}!`
  } catch (e) {
    message = `${e.inner} when saving blogger info!`
  }

  res.send({
    message: message
  })
}

export default handler
