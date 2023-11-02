import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { SpeedDial } from '@mui/material';
import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';



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
  return (
    <>
      <Modal open={openAddOrganizationModal} onClose={() => setOpen(false)}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ModalDialog>
          <ModalClose />
          <Typography>Modal title</Typography>
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