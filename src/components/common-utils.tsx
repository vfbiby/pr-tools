import React, {type ReactElement} from "react";
import {
  type GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid-premium";
import {getDataByMessage} from "~src/components/notes-rate-table";
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

export function DeleteButton(props: { onClick: () => Promise<void>, selectedRows: GridRowSelectionModel }) {
  return <Button
    disabled={props.selectedRows.length === 0}
    onClick={props.onClick}
    startIcon={<DeleteIcon sx={{fontSize: 28, color: red[600]}}/>}>
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

export const handleDelete = async (tables: string | string[], selectedRow: GridRowSelectionModel, refresh?: () => void) => {
  const userIds = Array.from(selectedRow).map(value => value);
  if (userIds.length <= 0) {
    console.log('0 user ids to delete')
    return
  }
  if (!Array.isArray(tables)) {
    await deleteRecordsByIdsThroughMessage(tables, userIds);
  }
  for (const table of tables) {
    await deleteRecordsByIdsThroughMessage(table, userIds);
  }
  refresh()
}

export const getTableWithOtherTable = async (table: string, otherTable: string, referenceKey: string) => {
  const {data: tableRecords} = await getDataByMessage(table) as { data: any[] };
  const {data: otherTableRecords} = await getDataByMessage(otherTable) as { data: any[] };
  tableRecords.forEach(tableRecord => {
    tableRecord.blogger = otherTableRecords.find(otherTableRecord => otherTableRecord[referenceKey] === tableRecord[referenceKey])
  })
  return tableRecords;
}

