import React, {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {zhCN} from "~src/localization/zh-CN";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import type {FansProfile} from "~src/columns/FansProfile";
import {getDataByMessage} from "~src/components/notes-rate-table";
import {columns} from "~src/columns/fans-profile-columns";

export function getFansProfileByMessage(setNotesRateInfo: Dispatch<SetStateAction<FansProfile[]>>) {
  getDataByMessage('FANS_PROFILE').then(response => {
    setNotesRateInfo(response.data)
  })
}

const getFansProfileWithBlogger = async () => {
  const {data: fansProfiles} = await getDataByMessage('FANS_PROFILE') as { data: FansProfile[] };
  const {data: bloggerInfos} = await getDataByMessage('BLOGGER_INFO') as { data: IBloggerInfo[] };
  fansProfiles.map(fansProfile => {
    fansProfile.blogger = bloggerInfos.find(blogger => blogger.userId === fansProfile.userId)
  })
  return fansProfiles;
}

export const FansProfileTable = () => {
  const [fansProfile, setFansProfile] = useState<FansProfile[]>([])

  useEffect(() => {
    getFansProfileWithBlogger().then(fansProfile => setFansProfile(fansProfile))
  }, []);

  useEffect(() => {
    getFansProfileByMessage(setFansProfile);
  }, [window.location.href]);

  return <React.Fragment>
    <DataGridPremium
      localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
      slots={{toolbar: GridToolbar}}
      slotProps={{toolbar: {excelOptions: {disableToolbarButton: true}}}}
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