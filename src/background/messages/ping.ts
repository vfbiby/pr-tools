import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  res.send({
    message: `hello from ping with data ${req.body.id}!`
  })
}

export default handler