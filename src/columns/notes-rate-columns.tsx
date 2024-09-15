import type {GridColDef, GridRenderCellParams} from "@mui/x-data-grid-premium";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";

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
    field: 'noteNumber',
    headerName: '笔记数',
    width: 80,
    editable: true,
  },
  {
    field: 'videoNoteNumber',
    headerName: '视频笔记数',
    width: 80,
    editable: true,
  },
  {
    field: 'hundredLikePercent',
    headerName: '百赞笔记数',
    width: 80,
    editable: true,
  },
  {
    field: 'thousandLikePercent',
    headerName: '千赞笔记数',
    width: 80,
    editable: true,
  },
  {
    field: 'noteType',
    headerName: '笔记类型',
    width: 120,
    editable: true,
  },
  {
    field: 'impMedian',
    headerName: '曝光中位数',
    width: 80,
    editable: true,
  },
  {
    field: 'impMedianBeyondRate',
    headerName: '曝光超越',
    width: 80,
    editable: true,
  },
  {
    field: 'readMedian',
    headerName: '阅读中位数',
    width: 80,
    editable: true,
  },
  {
    field: 'readMedianBeyondRate',
    headerName: '阅读超越',
    width: 80,
    editable: true,
  },
  {
    field: 'interactionMedia',
    headerName: '互动中位数',
    width: 80,
    editable: true,
  },
  {
    field: 'interactionRate',
    headerName: '互动率',
    width: 80,
    editable: true,
  },
  {
    field: 'interactionBeyondRate',
    headerName: '互动超越',
    width: 80,
    editable: true,
  },
  {
    field: 'likeMedian',
    headerName: '点赞中位数',
    width: 80,
    editable: true,
  },
  {
    field: 'collectMedian',
    headerName: '收藏中位数',
    width: 80,
    editable: true,
  },
  {
    field: 'commentMedian',
    headerName: '曝光中位数',
    width: 80,
    editable: true,
  },
  {
    field: 'shareMedian',
    headerName: '分享中位数',
    width: 80,
    editable: true,
  },
  {
    field: 'videoFullViewRate',
    headerName: '视频完播率',
    width: 80,
    editable: true,
  },
  {
    field: 'videoFullViewBeyondRate',
    headerName: '视频完播超越',
    width: 80,
    editable: true,
  },
  {
    field: 'picture3sViewRate',
    headerName: '图片3秒完播',
    width: 80,
    editable: true,
  },
  {
    field: 'pagePercentVo',
    headerName: 'Page percent vo',
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
    field: 'mFollowCnt',
    headerName: '关注中位数',
    width: 80,
    editable: true,
  },
];