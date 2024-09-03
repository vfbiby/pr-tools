import {useCallback, useState} from "react"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Button} from "@mui/material";
import {sendToBackground} from "@plasmohq/messaging"
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "~src/libs/db";

function IndexPopup() {
  const [data, setData] = useState("")
  const iBloggerInfos = useLiveQuery(() => db.bloggerInfo.toArray());

  const sendMessage = useCallback(async () => {
    const resp = await sendToBackground({
      name: "ping",
      body: {
        id: 9932
      }
    })
    alert(resp.message)
  }, []);

  const clearBloggerInfo = () => {
    db.bloggerInfo.clear();
  }

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <Button onClick={() => sendMessage()}>send</Button>
      <Button onClick={() => clearBloggerInfo()}>clear</Button>
      <ul>
        {iBloggerInfos?.map((blogger) => (
          <li key={blogger.userId}>
            {blogger.name}, {blogger.fansCount}
          </li>
        ))}
      </ul>
      <input onChange={(e) => setData(e.target.value)} value={data}/>
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
