import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import { Button, DialogActions, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingButton } from '@mui/lab';

export type DataGridDeleteDialogProps = {
  onDelete?: any;
  open: boolean;
  setOpen: any;
  texto: string;
  titulo: string;
  textoBotaoConfirma: string;
}
export default function DeleteDialog(props: DataGridDeleteDialogProps) {


  const handleClose = () => {
    props.setOpen(false);
  };
  const handleDelete = () => {
    handleClose();
    props.onDelete();
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="dialogo-confirma-delete-titulo"
        aria-describedby="dialogo-confirma-delete-descricao"
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <ModalClose />
          <DialogTitle id="dialogo-confirma-delete-titulo" sx={{ mb: 2 }}>
            <WarningRoundedIcon />
            {props.titulo}
          </DialogTitle>
          <DialogContent>
            <DialogContent id="dialogo-confirma-delete-descricao">
            {props.texto}
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              color='error'
              onClick={() => handleDelete()}
              autoFocus
              variant='contained'
              form="new-organization-form"
              id="new-organization-form-btn"
              loadingPosition="center"
            >
            {props.textoBotaoConfirma}
              <DeleteForeverIcon sx={{ ml: 1 }} />
            </LoadingButton>
            <Button color="neutral" variant='outlined' onClick={() => handleClose()}>CANCELAR</Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

    </div>
  );
}