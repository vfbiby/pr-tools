import React, {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import {sendToBackground} from "@plasmohq/messaging";

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
  }, []);

  return <React.Fragment>
    <div>{JSON.stringify(notesRate)}</div>
  </React.Fragment>
}