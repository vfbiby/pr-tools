import {SimpleDialog} from "~src/components/SimpleDialog";
import * as React from "react";

const emails = ['username@gmail.com', 'user02@gmail.com'];

export function SaveBloggerButton(props: { onClick: () => Promise<void>, loading: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = async () => {
    setOpen(true);
    // await props.onClick()
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return <div>
    <button onClick={props.onClick}
            style={{padding: "10px 15px", borderRadius: 30, border: 0, margin: "0 5px"}}>
      {props.loading ? "..." : '+'}
    </button>
    <SimpleDialog
      selectedValue={selectedValue}
      open={open}
      onClose={handleClose}
    />
  </div>;
}