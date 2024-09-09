import type {PlasmoCSConfig} from "plasmo"
import {Box, Drawer} from "@mui/material";
import {type Dispatch, type SetStateAction, useCallback, useEffect, useState} from "react";
import {useStorage} from "@plasmohq/storage/hook";
import {sendToBackground} from "@plasmohq/messaging";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from "@mui/material/Avatar";
import type {IBloggerInfo, IBloggerInfoResponse, IVisitBloggerInfo} from "~src/libs/BloggerInfo";
import {
  DataGridPremium,
  type GridColDef,
  type GridRenderCellParams,
  GridToolbar
} from "@mui/x-data-grid-premium";
import {LicenseInfo} from "@mui/x-license-pro";

export const config: PlasmoCSConfig = {
  matches: ["*://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/*"]
}

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
  const [remoteBloggerInfo, setRemoteBloggerInfo] = useState<IBloggerInfo[]>()

  const columns: GridColDef<IBloggerInfo>[] = [
    {
      field: 'userId', headerName: 'ID', width: 90,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        if (!params.value) return '';
        return <a target="_blank"
                  href={`https://pgy.xiaohongshu.com/solar/pre-trade/blogger-detail/${params.value.trim()}`}>
          {params.value.trim()}
        </a>
      }
    },
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
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        if (!params.value) return '';
        return <Box><LocationOnIcon fontSize="small"/>{params.value.trim()}</Box>
      }
    },
    {
      field: 'noteSign',
      headerName: '签约',
      width: 80,
      editable: true,
      renderCell: (params: GridRenderCellParams<any, { name: string, userId: string }>) => {
        if (!params.value) return '';
        return <a target="_blank"
                  href={`https://pgy.xiaohongshu.com/solar/pre-trade/view/mcn-detail/${params.value.userId}`}>
          {params.value.name}
        </a>
      }
    },
    {
      field: 'headPhoto',
      headerName: '头像',
      width: 80,
      editable: true,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        if (!params.value) return '';
        return <Avatar src={`${params.value.trim()}`} alt="blogger header photo"/>
      }
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
      headerName: '账号状态',
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
      field: 'personalTags',
      headerName: '个人标签',
      width: 150,
      editable: true,
    },
    {
      field: 'clickMidNum',
      headerName: '阅读中位数',
      width: 100,
      editable: true,
    },
    {
      field: 'mEngagementNum',
      headerName: '互动中位数',
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
  ];

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
      sx: {width: "100%", height: "70%"}
    }}
  >
    <Box sx={{height: "100%"}}>
      <DataGridPremium
        slots={{toolbar: GridToolbar}}
        slotProps={{toolbar: {excelOptions: {disableToolbarButton: true}}}}
        getRowId={row => row.userId}
        rows={remoteBloggerInfo}
        initialState={{
          pagination: {
            paginationModel: {pageSize: 20}
          }
        }}
        columns={columns}
        pagination={true}
        pageSizeOptions={[5, 10, 20, 50, 100, {value: 1000, label: '1千'}]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  </Drawer>;
}

const BloggerFloat = () => {
  LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

  const [openPopup, setOpenPopup] = useState(false)
  return (
    <div style={{margin: "200px 0 0 10px"}}>
      {!openPopup && <button onClick={() => setOpenPopup(true)}>show</button>}
      <BloggerPopup open={openPopup} onClose={() => setOpenPopup(false)}/>
    </div>
  )
}

export default BloggerFloat
