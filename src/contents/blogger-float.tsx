import type {PlasmoCSConfig} from "plasmo"
import {Box, Button, Drawer} from "@mui/material";
import {type Dispatch, type SetStateAction, useCallback, useEffect, useState} from "react";
import {useStorage} from "@plasmohq/storage/hook";
import {db} from "~src/libs/db";
import {useLiveQuery} from "dexie-react-hooks";
import {sendToBackground} from "@plasmohq/messaging";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

export type IBloggerInfo = {
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

export type IBloggerInfoResponse = {
  "code": number;
  "msg": string;
  "guid": unknown;
  "success": boolean;
  data: IBloggerInfo;
}

export type IVisitBloggerInfo = {
  bloggerId: string,
  info: { bloggerInfo: Partial<IBloggerInfo> }
};

function getBloggerInfo(setRemoteBloggerInfo: Dispatch<SetStateAction<IBloggerInfo[]>>) {
  const promise: Promise<{ data: IBloggerInfo[] }> = sendToBackground({
    name: "read/blogger-info"
  });
  promise.then(dbData => {
    setRemoteBloggerInfo(dbData.data)
  })
}

function BloggerPopup(props: { open: boolean, onClose: () => void }) {
  const [bloggerInfo, setBloggerInfo] = useState<IBloggerInfo>(null)
  const [visitBlogger, setVisitBlogger] = useStorage<IVisitBloggerInfo[]>('visitBlogger');
  const iBloggerInfos = useLiveQuery(() => db.bloggerInfo.toArray());
  const [remoteBloggerInfo, setRemoteBloggerInfo] = useState<IBloggerInfo[]>()

  const columns: GridColDef<IBloggerInfo>[] = [
    {field: 'userId', headerName: 'ID', width: 90},
    {
      field: 'name',
      headerName: '用户名',
      width: 100,
      editable: true,
    },
    {
      field: 'fansCount',
      headerName: '粉丝数',
      width: 80,
      editable: true,
    }
  ];

  const addBlogger = async () => {
    await setVisitBlogger([...visitBlogger, {bloggerId: 'new-id', info: {bloggerInfo: {name: 'james'}}}])
  };

  useEffect(() => {
    getBloggerInfo(setRemoteBloggerInfo);
  }, []);

  useEffect(() => {
    if (visitBlogger !== undefined && !bloggerInfo) {
      if (visitBlogger === null) {
      }
    }
  }, [visitBlogger, bloggerInfo]);

  async function sendMessage(bloggerInfo: IBloggerInfo) {
    const resp = await sendToBackground({
      name: "save/blogger-info",
      body: {
        blogger: bloggerInfo
      }
    })
    console.log(resp.message)
  }

  const onMessageListener = useCallback(
    async (e: any) => {
      const type = e.detail.type
      if (type === "BLOGGER_INFO") {
        const response = JSON.parse(e.detail.responseText) as IBloggerInfoResponse;
        if (response.code === 0) {
          let data = response.data;
          await sendMessage(response.data);
          setBloggerInfo(data)
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
      <DataGrid
        getRowId={row => row.userId}
        rows={remoteBloggerInfo}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
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
