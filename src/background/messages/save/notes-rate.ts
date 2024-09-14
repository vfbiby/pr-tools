import type {PlasmoMessaging} from "@plasmohq/messaging"
import {db} from "~src/libs/db";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  let id: string;
  let message: string
  try {
    id = await db.notesRate.add(req.body.notesRate);
    message = `saved notes rate with id ${id}!`
  } catch (e) {
    message = `${e.inner} when saving notes rate!`
  }

  res.send({
    message: message
  })
}

export default handler
