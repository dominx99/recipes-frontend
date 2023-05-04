import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC } from "react";

interface Props {
  value: string;
  title: React.ReactNode;
  body: React.ReactNode;
  open: boolean;
  onClose: (value: string, confirmed: boolean) => void;
}

const ConfirmationDialog: FC<Props> = (props) => {
  const { open, onClose, value, title, body, ...other } = props;

  const handleCancel = () => {
    onClose(value, false);
  }

  const handleOk = () => {
    onClose(value, true);
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{body}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;
