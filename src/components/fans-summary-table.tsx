import React, {type Dispatch, type SetStateAction, useCallback, useEffect, useState} from "react";
import {zhCN} from "~src/localization/zh-CN";
import {DataGridPremium, type GridRowSelectionModel} from "@mui/x-data-grid-premium";
import type {FansSummary} from "~src/columns/FansSummary";
import {columns} from "~src/columns/fans-summary-columns";
import {CustomToolbar, DeleteButton, getTableWithOtherTable, handleDelete} from "~src/components/common-utils";

export function getDataAnd(setFansSummary: Dispatch<SetStateAction<FansSummary[]>>) {
  getTableWithOtherTable('FANS_SUMMARY', 'BLOGGER_INFO', "userId").then(fansSummary => setFansSummary(fansSummary))
}

export const FansSummaryTable = () => {
  const [fansSummary, setFansSummary] = useState<FansSummary[]>([])
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])

  useEffect(() => {
    getDataAnd(setFansSummary);
  }, [window.location.href]);

  const ConstructToolbar = useCallback(() => {
    return (
      <CustomToolbar
        deleteButton={<DeleteButton
          onClick={() => handleDelete('FANS_SUMMARY', rowSelectionModel, () => getDataAnd(setFansSummary))}
          selectedRows={rowSelectionModel}/>}/>
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