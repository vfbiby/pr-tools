import type {GridColDef} from "@mui/x-data-grid-premium";
import {contentTagRender, dateValueFormatter, IDRender, numberRender, PercentageRender} from "~src/libs/renders";

export const columns: GridColDef<NotesRate>[] = [
  {
    field: 'userId', headerName: 'ID', width: 90,
    renderCell: IDRender
  },
  {
    field: 'noteNumber',
    headerName: '笔记数',
    width: 80,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'videoNoteNumber',
    headerName: '视频笔记数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'hundredLikePercent',
    headerName: '百赞笔记',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'thousandLikePercent',
    headerName: '千赞笔记',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'picture3sViewRate',
    headerName: '图片3秒完播',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'videoFullViewRate',
    headerName: '视频完播率',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'videoFullViewBeyondRate',
    headerName: '视频完播超越',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'noteType',
    headerName: '笔记类型',
    width: 170,
    editable: true,
    renderCell: contentTagRender
  },
  {
    field: 'impMedian',
    headerName: '曝光中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'impMedianBeyondRate',
    headerName: '曝光超越',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'readMedian',
    headerName: '阅读中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'readMedianBeyondRate',
    headerName: '阅读超越',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'mEngagementNum',
    headerName: '互动中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'mFollowCnt',
    headerName: '关注中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'likeMedian',
    headerName: '点赞中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'collectMedian',
    headerName: '收藏中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'commentMedian',
    headerName: '评论中位数',
    width: 100,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'shareMedian',
    headerName: '分享中位数',
    width: 100,
    editable: true,
  },
  {
    field: 'interactionMedian',
    headerName: '互动中位数(老)',
    width: 100,
    editable: true,
  },
  {
    field: 'interactionRate',
    headerName: '互动率',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'interactionBeyondRate',
    headerName: '互动超越',
    width: 100,
    editable: true,
    renderCell: PercentageRender
  },
  // {
  //   field: 'pagePercentVo',
  //   headerName: 'Page percent vo',
  //   width: 100,
  //   editable: true,
  // },
  {
    field: 'createdAt',
    headerName: '添加时间',
    width: 100,
    valueFormatter: dateValueFormatter
  },
];