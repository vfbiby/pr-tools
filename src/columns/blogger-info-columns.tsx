import type {GridColDef, GridRenderCellParams} from "@mui/x-data-grid-premium";
import type {IBloggerInfo} from "~src/libs/BloggerInfo";
import {Box} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Avatar from "@mui/material/Avatar";

export const columns: GridColDef<IBloggerInfo>[] = [
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
    headerName: '机构',
    width: 100,
    editable: true,
    renderCell: (params: GridRenderCellParams<any, { name: string, userId: string }>) => {
      if (!params.value) return '';
      return <Box>
        <ApartmentIcon fontSize="small" sx={{mr: 0.5}}/>
        <a target="_blank"
           href={`https://pgy.xiaohongshu.com/solar/pre-trade/view/mcn-detail/${params.value.userId}`}>
          {params.value.name}
        </a></Box>
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
    field: 'createdAt',
    headerName: '添加时间',
    width: 95,
    editable: true,
    valueFormatter: (value: string) => {
      return new Date(value).toLocaleString("zh-CN")
    }
  },
  {
    field: 'redId',
    headerName: '红书号',
    width: 100,
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