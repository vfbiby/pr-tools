import React, {type Dispatch, type ReactElement, type SetStateAction} from "react";
import {
  type GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid-premium";
import {getDataByMessage} from "~src/components/notes-rate-table";
import type {FansSummary} from "~src/columns/FansSummary";
import type {IBloggerInfo} from "~src/columns/BloggerInfo";
import {sendToBackground} from "@plasmohq/messaging";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

export function DeleteButton(props: { onClick: () => Promise<void> }) {
  return <Button onClick={props.onClick}>
    <DeleteIcon sx={{pr: 1, fontSize: 28, color: red[600]}}/>
    删除
  </Button>;
}

export async function deleteRecordsByIdsThroughMessage(type: string, userIds: (string | number)[]) {
  await sendToBackground({
    name: 'delete/blogger',
    body: {
      type: type,
      ids: userIds
    }
  });
}

export const handleDelete = async (selectedRow: GridRowSelectionModel, refresh?: () => void) => {
  const userIds = Array.from(selectedRow).map(value => value);
  if (userIds.length <= 0) {
    console.log('0 user ids to delete')
    return
  }
  await deleteRecordsByIdsThroughMessage('FANS_SUMMARY', userIds);
  refresh()
}

export const getTableWithOtherTable = async (table: string, otherTable: string, referenceKey: string) => {
  const {data: fansSummaries} = await getDataByMessage(table) as { data: FansSummary[] };
  const {data: bloggerInfos} = await getDataByMessage(otherTable) as { data: IBloggerInfo[] };
  fansSummaries.forEach(fansProfile => {
    fansProfile.blogger = bloggerInfos.find(blogger => blogger[referenceKey] === fansProfile[referenceKey])
  })
  return fansSummaries;
}

export function getDataAnd(setFansSummary: Dispatch<SetStateAction<FansSummary[]>>) {
  getTableWithOtherTable('FANS_SUMMARY', 'BLOGGER_INFO', "userId").then(fansSummary => setFansSummary(fansSummary))
}