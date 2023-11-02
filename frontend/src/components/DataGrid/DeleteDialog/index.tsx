import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="dialogo-confirma-delete-titulo"
        aria-describedby="dialogo-confirma-delete-descricao"
      >
        <DialogTitle id="dialogo-confirma-delete-titulo">
          {props.titulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialogo-confirma-delete-descricao">
            {props.texto}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            {props.textoBotaoConfirma}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}