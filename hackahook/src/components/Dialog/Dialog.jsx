import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.text}
          </DialogContentText>
          {
            (props.insertTextField === undefined) ? <></>
              :
              <TextField
                autoFocus
                margin="dense"
                label="Descripcion"
                type="text"
                fullWidth
                variant="standard"
                onChange={props.handleChange}
              />
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleReject}>No Aceptar</Button>
          <Button onClick={props.handleAccept} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}