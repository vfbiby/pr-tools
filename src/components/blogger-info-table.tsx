import React, {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import {sendToBackground} from "@plasmohq/messaging";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import {columns} from "~src/columns/blogger-info-columns";
import {zhCN} from "~src/localization/zh-CN";

export function getBloggerInfo(setRemoteBloggerInfo: Dispatch<SetStateAction<IBloggerInfo[]>>) {
  sendToBackground({
    name: "read/blogger-info"
  }).then(response => {
    setRemoteBloggerInfo(response.data)
  })
}

export function BloggerInfoTable() {
  const [remoteBloggerInfo, setRemoteBloggerInfo] = useState<IBloggerInfo[]>([])

  useEffect(() => {
    getBloggerInfo(setRemoteBloggerInfo);
  }, [window.location.href]);

  return <DataGridPremium
    localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
    slots={{toolbar: GridToolbar}}
    slotProps={{toolbar: {excelOptions: {disableToolbarButton: true}}}}
    getRowId={row => row.userId}
    rows={remoteBloggerInfo}
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

}