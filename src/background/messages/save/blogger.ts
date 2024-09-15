import type {PlasmoMessaging} from "@plasmohq/messaging"
import {db} from "~src/libs/db";

export const typeDBMap = {
  'BLOGGER_INFO': db.bloggerInfo,
  'NOTES_RATE': db.notesRate,
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  let id: string;
  let message: string
  try {
    id = await typeDBMap[req.body.type].add(req.body.data);
    message = `saved ${req.body.type} with id ${id}!`
  } catch (e) {
    message = `${e.inner} when saving ${req.body.type}!`
  }

  res.send({
    message: message
  })
}

export default handler
