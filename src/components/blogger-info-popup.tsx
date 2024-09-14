import {useCallback, useEffect, useState} from "react";
import type {IBloggerInfo, IBloggerInfoResponse} from "~src/libs/BloggerInfo";
import {sendToBackground} from "@plasmohq/messaging";
import {Box, Drawer} from "@mui/material";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import {columns} from "~src/columns/blogger-info-columns";
import {getBloggerInfo} from "~src/contents/pgy-float";
import {zhCN} from "~src/localization/zh-CN";
import {extractBloggerIdFromPgyHomepage} from "~src/contents/xhs-explorer-inline-blogger-link";

export function BloggerInfoPopup(props: { open: boolean, onClose: () => void }) {
  const [remoteBloggerInfo, setRemoteBloggerInfo] = useState<IBloggerInfo[]>()

  useEffect(() => {
    getBloggerInfo(setRemoteBloggerInfo);
  }, [window.location.href]);

  const saveNotesRateByMessage = useCallback(async (notesRate: any) => {
    const resp = await sendToBackground({
      name: "save/notes-rate",
      body: {notesRate}
    })
    console.log(resp.message)
  }, []);

  async function sendMessage(bloggerInfo: IBloggerInfo) {
    const resp = await sendToBackground({
      name: "save/blogger-info",
      body: {
        blogger: bloggerInfo
      }
    })
    getBloggerInfo(setRemoteBloggerInfo);
    console.log(resp.message)
  }

  const onMessageListener = useCallback(
    async (e: any) => {
      const type = e.detail.type
      if (type === "BLOGGER_INFO") {
        const response = JSON.parse(e.detail.responseText) as IBloggerInfoResponse;
        if (response.code === 0) {
          const bloggerInfo = response.data;
          bloggerInfo.createdAt = new Date();
          await sendMessage(bloggerInfo);
        } else
          console.log("blogger info getting error!")
      }
      if (type === 'NOTES_RATE') {
        const userId = extractBloggerIdFromPgyHomepage(window.location.href);
        if (!userId) {
          console.log(`has no userId ${userId}, so quit to save notes rate!`)
          return
        }
        const response = JSON.parse(e.detail.responseText);
        if (response.code === 0) {
          const notesRate = response.data;
          notesRate.createdAt = new Date();
          notesRate.userId = userId;
          await saveNotesRateByMessage(notesRate);
        } else
          console.log("notes rate getting error!")
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
    </Box>
  </Drawer>;
}