import {useState} from "react"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Button} from "@mui/material";
import {useStorage} from "@plasmohq/storage/dist/hook";
import type {IVisitBloggerInfo} from "~src/contents/blogger-float";

function IndexPopup() {
  const [data, setData] = useState("")
  const [visitBlogger, setVisitBlogger] = useStorage<IVisitBloggerInfo[]>('visitBlogger');

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
      <Button>hello</Button>
      <div>
        {
          visitBlogger?.map(blogger => {
            return <div>{blogger.info.bloggerInfo?.name}</div>
          })
        }
      </div>
      <input onChange={(e) => setData(e.target.value)} value={data}/>
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
