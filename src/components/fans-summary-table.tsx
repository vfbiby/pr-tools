import React, {
  type Dispatch, type MutableRefObject,
  type ReactElement,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import {zhCN} from "~src/localization/zh-CN";
import {
  DataGridPremium, type GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid-premium";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import {getDataByMessage} from "~src/components/notes-rate-table";
import type {FansSummary} from "~src/columns/FansSummary";
import {columns} from "~src/columns/fans-summary-columns";
import {Button} from "@mui/material";
import {sendToBackground} from "@plasmohq/messaging";
import DeleteIcon from '@mui/icons-material/Delete';
import {red} from "@mui/material/colors";

export function CustomToolbar({deleteButton}: { deleteButton: ReactElement }) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton/>
      <GridToolbarDensitySelector/>
      <GridToolbarExport
        excelOptions={{disableToolbarButton: true}}
      />
      {deleteButton}
    </GridToolbarContainer>
  );
}

function DeleteButton(props: { onClick: () => Promise<void> }) {
  return <Button onClick={props.onClick}>
    <DeleteIcon sx={{pr: 1, fontSize: 28, color: red[600]}}/>
    删除
  </Button>;
}

export async function deleteRecordsByIdsThroughMessage(type: string = 'FANS_SUMMARY', userIds: (string | number)[]) {
  await sendToBackground({
    name: 'delete/blogger',
    body: {
      type: type,
      ids: userIds
    }
  });
}

const handleDelete = async (selectedRow: GridRowSelectionModel, refresh?: () => void) => {
  const userIds = Array.from(selectedRow).map(value => value);
  if (userIds.length <= 0) {
    console.log('0 user ids to delete')
    return
  }
  await deleteRecordsByIdsThroughMessage('FANS_SUMMARY', userIds);
  refresh()
}

const getFansSummaryWithBlogger = async () => {
  const {data: fansSummaries} = await getDataByMessage('FANS_SUMMARY') as { data: FansSummary[] };
  const {data: bloggerInfos} = await getDataByMessage('BLOGGER_INFO') as { data: IBloggerInfo[] };
  fansSummaries.map(fansProfile => {
    fansProfile.blogger = bloggerInfos.find(blogger => blogger.userId === fansProfile.userId)
  })
  return fansSummaries;
}

function getDataAnd(setFansSummary: Dispatch<SetStateAction<FansSummary[]>>) {
  getFansSummaryWithBlogger().then(fansSummary => setFansSummary(fansSummary))
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
          onClick={() => handleDelete(rowSelectionModel, () => getDataAnd(setFansSummary))}/>}/>
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