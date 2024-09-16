import React, {type Dispatch, type SetStateAction, useCallback, useEffect, useState} from "react";
import {sendToBackground} from "@plasmohq/messaging";
import {zhCN} from "~src/localization/zh-CN";
import {DataGridPremium, type GridRowSelectionModel} from "@mui/x-data-grid-premium";
import {columns} from "~src/columns/notes-rate-columns";
import type {NotesRate} from "~src/columns/NotesRate";
import {CustomToolbar, DeleteButton, getTableWithOtherTable, handleDelete} from "~src/components/common-utils";

const NOTES_RATE = 'NOTES_RATE';

function getDataAnd<T>(setNotesRate: Dispatch<SetStateAction<T[]>>) {
  getTableWithOtherTable(NOTES_RATE, 'BLOGGER_INFO', "userId").then(notesRate => setNotesRate(notesRate))
}

export function getDataByMessage(type: string = NOTES_RATE) {
  return sendToBackground({
    name: 'read/blogger',
    body: {
      type: type
    }
  });
}

export const NotesRateTable = () => {
  const [notesRate, setNotesRate] = useState<NotesRate[]>([])
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])

  useEffect(() => {
    getDataAnd(setNotesRate)
  }, []);

  const ConstructToolbar = useCallback(() => {
    const handleOnClick = () => handleDelete(NOTES_RATE, rowSelectionModel, () => getDataAnd(setNotesRate));
    return (
      <CustomToolbar deleteButton={<DeleteButton onClick={handleOnClick} selectedRows={rowSelectionModel}/>}/>
    )
  }, [rowSelectionModel]);

  return <React.Fragment>
    <DataGridPremium
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel)
      }}
      localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
      slots={{toolbar: ConstructToolbar}}
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