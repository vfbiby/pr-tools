import {cooperation, SimpleDialog} from "~src/components/SimpleDialog";
import * as React from "react";
import type {BloggerTable} from "~src/libs/wps";
import {addBloggerToWps} from "~src/contents/xhs-profile-inline-blogger-collection";
import {useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export function SaveBloggerButton(props: {
  bloggerInfo: BloggerTable,
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [respMessage, setRespMessage] = useState<string>()
  const [selectedValue, setSelectedValue] = React.useState<string>(cooperation[0]);
  const [loading, setLoading] = useState<boolean>(false)
  const [messageOpen, setMessageOpen] = useState(false)

  const handleClickOpen = async () => {
    setDialogOpen(true)
  };

  const handleSaveBlogger = async () => {
    const extraInfo = {"合作建议": selectedValue, "备注": "尽快联系询价"}
    const response = await addBloggerToWps({...props.bloggerInfo, ...extraInfo})
    response.error ? setRespMessage(response.error) : setRespMessage("博主保存成功！")
    setMessageOpen(true)
  };

  const handleClose = async (value: string) => {
    setSelectedValue(value);
    setDialogOpen(false)
    setLoading(true)
    await handleSaveBlogger()
  };

  return <div>
    <button onClick={handleClickOpen}
            style={{padding: "10px 15px", borderRadius: 30, border: 0, margin: "0 5px"}}>
      {loading ? "..." : '+'}
    </button>
    <SimpleDialog
      selectedValue={selectedValue}
      open={dialogOpen}
      onClose={handleClose}
    />

    <Dialog onClose={() => setMessageOpen(false)} open={messageOpen}>
      <DialogTitle>{respMessage}</DialogTitle>
    </Dialog>
  </div>;
}