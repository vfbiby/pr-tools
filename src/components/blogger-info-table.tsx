import React, {type Dispatch, type SetStateAction, useCallback, useEffect, useState} from "react";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import {DataGridPremium, type GridRowSelectionModel} from "@mui/x-data-grid-premium";
import {columns} from "~src/columns/blogger-info-columns";
import {zhCN} from "~src/localization/zh-CN";
import {CustomToolbar, DeleteButton, handleDelete} from "~src/components/common-utils";
import {getDataByMessage} from "~src/components/notes-rate-table";

export const BLOGGER_INFO = 'BLOGGER_INFO';

export function getBloggerInfo(setBloggerInfo: Dispatch<SetStateAction<IBloggerInfo[]>>) {
  getDataByMessage(BLOGGER_INFO)
    .then((response: { data: IBloggerInfo[] }) => setBloggerInfo(response.data))
}

export function BloggerInfoTable() {
  const [bloggerInfo, setBloggerInfo] = useState<IBloggerInfo[]>([])
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])

  useEffect(() => {
    getBloggerInfo(setBloggerInfo);
  }, []);

  const ConstructToolbar = useCallback(() => {
    const handleOnClick = () => handleDelete(BLOGGER_INFO, rowSelectionModel, () => getBloggerInfo(setBloggerInfo));
    return (
      <CustomToolbar deleteButton={<DeleteButton onClick={handleOnClick} selectedRows={rowSelectionModel}/>}/>
    )
  }, [rowSelectionModel]);

  return <DataGridPremium
    onRowSelectionModelChange={(newRowSelectionModel) => {
      setRowSelectionModel(newRowSelectionModel)
    }}
    localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
    slots={{toolbar: ConstructToolbar}}
    slotProps={{toolbar: {excelOptions: {disableToolbarButton: true}}}}
    getRowId={row => row.userId}
    rows={bloggerInfo}
    initialState={{
      density: 'comfortable',
      pinnedColumns: {left: ['name'], right: ['createdAt']},
      sorting: {
        sortModel: [{
          field: 'createdAt', sort: 'desc'
        }]
      },
      pagination: {
        paginationModel: {pageSize: 10}
      }
    }}
    columns={columns}
    pagination={true}
    pageSizeOptions={[5, 10, 20, 50, 100, {value: 1000, label: '1千'}]}
    checkboxSelection
    disableRowSelectionOnClick
  />

}