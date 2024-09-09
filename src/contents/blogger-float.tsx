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
    },
    {
      field: 'likeCollectCountInfo',
      headerName: '获赞与藏',
      width: 80,
      editable: true,
    },
    {
      field: 'redId',
      headerName: '红书号',
      width: 80,
      editable: true,
    },
    {
      field: 'location',
      headerName: '地区',
      width: 80,
      editable: true,
    },
    {
      field: 'headPhoto',
      headerName: '头像',
      width: 80,
      editable: true,
    },
    {
      field: 'businessNoteCount',
      headerName: '商业笔记数',
      width: 80,
      editable: true,
    },
    {
      field: 'picturePrice',
      headerName: '图文报价',
      width: 80,
      editable: true,
    },
    {
      field: 'videoPrice',
      headerName: '视频报价',
      width: 80,
      editable: true,
    },
    {
      field: 'userType',
      headerName: '用户类型',
      width: 80,
      editable: true,
    },
    {
      field: 'pictureState',
      headerName: '图片合作',
      width: 80,
      editable: true,
    },
    {
      field: 'videoState',
      headerName: '视频合作',
      width: 80,
      editable: true,
    },
    {
      field: 'cooperateState',
      headerName: '合作状态',
      width: 80,
      editable: true,
    },
    {
      field: 'featureTags',
      headerName: '博主标签',
      width: 250,
      editable: true,
    },
    {
      field: 'currentLevel',
      headerName: '层级',
      width: 80,
      editable: true,
    },
    {
      field: 'gender',
      headerName: '性别',
      width: 80,
      editable: true,
    },
    {
      field: 'tradeType',
      headerName: '交易类型',
      width: 150,
      editable: true,
    },
    {
      field: 'clickMidNum',
      headerName: '点击中位数',
      width: 100,
      editable: true,
    },
    {
      field: 'interMidNum',
      headerName: 'inter中位数',
      width: 100,
      editable: true,
    },
    {
      field: 'mEngagementNum',
      headerName: '互动中位数',
      width: 80,
      editable: true,
    },
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
