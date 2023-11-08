import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { SpeedDial, Typography } from '@mui/material';

import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import NewInstitutionForm from '../NewInstitutionForm';
import { Modal } from '@mui/joy';



export default function MapSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openAddOrganizationModal, setOpenAddOrganizationModal] = React.useState(false);
  const [openAddActivityModal, setOpenAddActivityModal] = React.useState(false);
  const actions = [
    {
      icon: <FileCopyIcon />,
      name: 'Criar atividade',
      onClick: () => { setOpenAddActivityModal(true) }
    },
    {
      icon: <Diversity2Icon />,
      name: 'Criar organização',
      onClick: () => { setOpenAddOrganizationModal(true) }
    },
  ];

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '1px solid #4a4a4a',
    borderRadius: '3px',
    boxShadow: 24,
    p: 4,
    height: '70dvh',
    overflowY: 'auto'
  };

  return (
    <>
      <Modal
        open={openAddOrganizationModal}
        onClose={() => setOpenAddOrganizationModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalDialog sx={{overflowY: 'auto'}}>
          <ModalClose />
          <Typography> Nova Organização:</Typography>
          <br />
          <NewInstitutionForm setShowModal={setOpenAddOrganizationModal}/>
        </ModalDialog>
      </Modal>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'absolute', bottom: 20, right: 20 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleClose();
              action?.onClick();
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
}