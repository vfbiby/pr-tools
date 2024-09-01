import type {PlasmoCSConfig} from "plasmo"
import {Box, Button, Drawer} from "@mui/material";
import {useCallback, useEffect, useState} from "react";

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

type IBloggerInfo = {
  "userId": string;
  "valid": number;
  "headPhoto": string;
  "name": string;
  "redId": string;
  "location": string;
  "homePageDisplay": number;
  "type": [],
  "personalTags": string[],
  "fansCount": number;
  "likeCollectCountInfo": number;
  "businessNoteCount": number;
  "picturePrice": number;
  "videoPrice": number;
  "lowerPrice": number;
  "userType": number;
  "showPrice": null,
  "pictureState": number;
  "videoState": number;
  "isCollect": boolean;
  "cooperateState": number;
  "pictureInCart": boolean;
  "videoInCart": boolean;
  "noteSign": {
    "userId": string;
    "name": string;
  },
  "contentTags": {
    "taxonomy1Tag": string;
    "taxonomy2Tags": string[];
  }[],
  "featureTags": string[];
  "gender": "女" | "男";
  "currentLevel": number;
  "nextLevel": number;
  "priceState": number;
  "tradeType": string;
  "clickMidNum": number;
  "clickMidNumMcn": number;
  "interMidNum": number;
  "fansNum": number;
  "efficiencyValidUser": number;
  "lowActive": boolean;
  "cooperType": number;
  "buyerType": number;
  "kolType": number;
  "mEngagementNum": number;
  "mEngagementNumMcn": number;
}

type IBloggerInfoResponse = {
  "code": number;
  "msg": string;
  "guid": unknown;
  "success": boolean;
  data: IBloggerInfo;
}

function BloggerPopup(props: { open: boolean, onClose: () => void }) {
  const [bloggerInfo, setBloggerInfo] = useState<IBloggerInfo>(null)

  const onMessageListener = useCallback(
    async (e: any) => {
      const type = e.detail.type
      if (type === "BLOGGER_INFO") {
        const response = JSON.parse(e.detail.responseText) as IBloggerInfoResponse;
        if (response.code === 0) {
          setBloggerInfo(response.data)
        } else
          console.log("blogger info getting error!")
      }
    }, []);

  useEffect(() => {
    window.addEventListener("FROM_INJECTED", onMessageListener, false)
    return () => {
      window.removeEventListener("FROM_INJECTED", onMessageListener)
    }
  }, [])

  return <Drawer
    anchor="bottom"
    open={props.open}
    onClose={props.onClose}
    PaperProps={{
      sx: {width: "100%", height: "60%"}
    }}
  >
    <Box sx={{height: "100%"}}>
      <div style={{height: "calc(100% - 0px)", width: "100%"}}>
        <Button>hello</Button>
        <span>{bloggerInfo?.clickMidNum}</span>
      </div>
    </Box>
  </Drawer>;
}

const BloggerFloat = () => {
  const [openPopup, setOpenPopup] = useState(false)
  return (
    <div style={{margin: "200px 0 0 10px"}}>
      {!openPopup && <button onClick={() => setOpenPopup(true)}>show</button>}
      <BloggerPopup open={openPopup} onClose={() => setOpenPopup(false)}/>
    </div>
  )
}

export default BloggerFloat
