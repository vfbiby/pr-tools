import React, {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {sendToBackground} from "@plasmohq/messaging";
import {zhCN} from "~src/localization/zh-CN";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import {columns} from "~src/columns/notes-rate-columns";

export function getNotesRateByMessage(setNotesRateInfo: Dispatch<SetStateAction<NotesRate[]>>) {
  sendToBackground({
    name: 'read/blogger',
    body: {
      type: 'NOTES_RATE'
    }
  }).then(response => {
    setNotesRateInfo(response.data)
  })
}

export const NotesRateTable = () => {
  const [notesRate, setNotesRate] = useState<NotesRate[]>([])

  useEffect(() => {
    getNotesRateByMessage(setNotesRate);
  }, [window.location.href]);

  return <React.Fragment>
    <DataGridPremium
      localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
      slots={{toolbar: GridToolbar}}
      slotProps={{toolbar: {excelOptions: {disableToolbarButton: true}}}}
      getRowId={row => row.userId}
      rows={notesRate}
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