import type {GridColDef} from "@mui/x-data-grid-premium";
import {
  bloggerNameRender, dateValueFormatter,
  IDRender,
  numberRender,
  PercentageRender
} from "~src/libs/renders";
import type {FansSummary} from "~src/columns/FansSummary";

export const columns: GridColDef<FansSummary>[] = [
  {
    field: 'userId', headerName: 'ID', width: 90,
    renderCell: IDRender
  },
  {
    field: 'blogger',
    headerName: '名字',
    width: 100,
    editable: true,
    renderCell: bloggerNameRender,
  },
  {
    field: 'fansNum',
    headerName: '粉丝数',
    width: 80,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'fansIncreaseNum',
    headerName: '粉丝增量数',
    width: 120,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'fansGrowthRate',
    headerName: '粉丝增加率',
    width: 120,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'activeFansL28',
    headerName: '活跃粉丝数',
    width: 120,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'activeFansRate',
    headerName: '活跃粉丝占比',
    width: 120,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'activeFansBeyondRate',
    headerName: '活跃粉丝超越',
    width: 120,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'engageFansL30',
    headerName: '互动粉丝数',
    width: 120,
    editable: true,
    renderCell: numberRender
  },
  {
    field: 'engageFansRate',
    headerName: '互动粉丝占比',
    width: 120,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'engageFansBeyondRate',
    headerName: '互动粉丝超越',
    width: 120,
    editable: true,
    renderCell: PercentageRender,
  },
  {
    field: 'readFansIn30',
    headerName: '阅读粉丝数',
    width: 120,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'readFansRate',
    headerName: '阅读粉丝占比',
    width: 120,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'readFansBeyondRate',
    headerName: '阅读粉丝超越',
    width: 120,
    editable: true,
    renderCell: PercentageRender
  },
  {
    field: 'payFansUserNum30d',
    headerName: '支付粉丝数',
    width: 120,
    editable: true,
    renderCell: numberRender,
  },
  {
    field: 'payFansUserRate30d',
    headerName: '支付粉丝占比',
    width: 120,
    editable: true,
    renderCell: PercentageRender,
  },
  {
    field: 'createdAt',
    headerName: '添加时间',
    width: 100,
    valueFormatter: dateValueFormatter
  },
];