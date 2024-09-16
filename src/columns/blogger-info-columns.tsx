import type {GridColDef} from "@mui/x-data-grid-premium";
import type {BloggerInfo} from "~src/columns/BloggerInfo";

import {
  dateValueFormatter,
  headRender,
  IDRender,
  locationRender,
  noteSignRender,
  numberRender
} from "~src/libs/renders";

export const columns: GridColDef<BloggerInfo>[] = [
  {
    field: 'userId', headerName: 'ID', width: 90,
    renderCell: IDRender
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
    renderCell: numberRender,
  },
  {
    field: 'likeCollectCountInfo',
    headerName: '获赞与藏',
    width: 80,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'clickMidNum',
    headerName: '阅读中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'mEngagementNum',
    headerName: '互动中位数',
    width: 80,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'location',
    headerName: '地区',
    width: 100,
    editable: true,
    renderCell: locationRender
  },
  {
    field: 'noteSign',
    headerName: '机构',
    width: 100,
    editable: true,
    renderCell: noteSignRender
  },
  {
    field: 'headPhoto',
    headerName: '头像',
    width: 80,
    editable: true,
    renderCell: headRender
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
    renderCell: numberRender,
  },
  {
    field: 'videoPrice',
    headerName: '视频报价',
    width: 80,
    editable: true,
    renderCell: numberRender,
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
    valueFormatter: dateValueFormatter
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