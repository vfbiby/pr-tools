import React, {type Dispatch, type SetStateAction, useCallback, useEffect, useState} from "react";
import {zhCN} from "~src/localization/zh-CN";
import {DataGridPremium, type GridRowSelectionModel} from "@mui/x-data-grid-premium";
import type {FansProfile} from "~src/columns/FansProfile";
import {columns} from "~src/columns/fans-profile-columns";
import {CustomToolbar, DeleteButton, getTableWithOtherTable, handleDelete} from "~src/components/common-utils";

const FANS_PROFILE = 'FANS_PROFILE';

function getDataAnd<T>(setNotesRate: Dispatch<SetStateAction<T[]>>) {
  getTableWithOtherTable(FANS_PROFILE, 'BLOGGER_INFO', "userId").then(notesRate => setNotesRate(notesRate))
}

export const FansProfileTable = () => {
  const [fansProfile, setFansProfile] = useState<FansProfile[]>([])
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])

  const ConstructToolbar = useCallback(() => {
    const handleOnClick = () => handleDelete(FANS_PROFILE, rowSelectionModel, () => getDataAnd(setFansProfile));
    return (
      <CustomToolbar deleteButton={<DeleteButton onClick={handleOnClick} selectedRows={rowSelectionModel}/>}/>
    )
  }, [rowSelectionModel]);

  useEffect(() => {
    getDataAnd(setFansProfile)
  }, []);

  return <React.Fragment>
    <DataGridPremium
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel)
      }}
      localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
      slots={{toolbar: ConstructToolbar}}
      getRowId={row => row.userId}
      rows={fansProfile}
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