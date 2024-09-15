import React, {useCallback, useEffect, useState} from "react";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import {sendToBackground} from "@plasmohq/messaging";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import {columns} from "~src/columns/blogger-info-columns";
import {getBloggerInfo} from "~src/contents/pgy-float";
import {zhCN} from "~src/localization/zh-CN";
import {extractBloggerIdFromPgyHomepage} from "~src/contents/xhs-explorer-inline-blogger-link";

export function BloggerInfoTable() {
  const [remoteBloggerInfo, setRemoteBloggerInfo] = useState<IBloggerInfo[]>([])

  useEffect(() => {
    getBloggerInfo(setRemoteBloggerInfo);
  }, [window.location.href]);

  const saveDataByMessage = async (data: any, type: any) => {
    const resp = await sendToBackground({
      name: 'save/blogger',
      body: {data, type}
    })
    getBloggerInfo(setRemoteBloggerInfo);
    console.log(resp.message)
  };

  const onMessageListener = useCallback(
    async (e: any) => {
      const type = e.detail.type
      const response = JSON.parse(e.detail.responseText);
      if (response.code !== 0) {
        console.log("blogger info getting error!")
        return
      }
      if (!response.data.userId) {
        response.data.userId = extractBloggerIdFromPgyHomepage(window.location.href);
      }
      response.data.createdAt = new Date();
      await saveDataByMessage(response.data, type);
    }, []);

  useEffect(() => {
    window.addEventListener("FROM_INJECTED", onMessageListener, false)
    return () => {
      window.removeEventListener("FROM_INJECTED", onMessageListener)
    }
  }, [])

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