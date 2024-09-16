import React, {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {zhCN} from "~src/localization/zh-CN";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import {getDataByMessage} from "~src/components/notes-rate-table";
import type {FansSummary} from "~src/columns/FansSummary";
import {columns} from "~src/columns/fans-summary-columns";

export function getFansSummaryByMessage(setFansSummary: Dispatch<SetStateAction<FansSummary[]>>) {
  getDataByMessage('FANS_PROFILE').then(response => {
    setFansSummary(response.data)
  })
}

const getFansSummaryWithBlogger = async () => {
  const {data: fansSummaries} = await getDataByMessage('FANS_SUMMARY') as { data: FansSummary[] };
  const {data: bloggerInfos} = await getDataByMessage('BLOGGER_INFO') as { data: IBloggerInfo[] };
  fansSummaries.map(fansProfile => {
    fansProfile.blogger = bloggerInfos.find(blogger => blogger.userId === fansProfile.userId)
  })
  return fansSummaries;
}

export const FansSummaryTable = () => {
  const [fansSummary, setFansSummary] = useState<FansSummary[]>([])

  useEffect(() => {
    getFansSummaryWithBlogger().then(fansSummary => setFansSummary(fansSummary))
  }, []);

  useEffect(() => {
    getFansSummaryByMessage(setFansSummary);
  }, [window.location.href]);

  return <React.Fragment>
    <DataGridPremium
      localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
      slots={{toolbar: GridToolbar}}
      slotProps={{toolbar: {excelOptions: {disableToolbarButton: true}}}}
      getRowId={row => row.userId}
      rows={fansSummary}
      initialState={{
        density: 'comfortable',
        pinnedColumns: {left: ['name'], right: ['createdAt']},
        sorting: {
          sortModel: [{
            field: 'createdAt', sort: 'desc'
          }]
        },
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
  </React.Fragment>
}