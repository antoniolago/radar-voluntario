import { Button as SimpleButton, Grid, Typography } from '@mui/material';
import { ButtonContainer } from './styles';
import { useState } from 'react';
import AlertDialog from '../ConfirmDialog';
import { AuthService } from '@/api/auth';
import { Button, DialogActions, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { LoadingButton } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AccountEdit() {
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { mutate, isLoading } = AuthService.useDeleteUser();

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={12} >

                    <Typography mb={1}>
                        Ao excluir a conta, todos os seus dados serão permanentemente removidos e não poderão ser recuperados.
                    </Typography>

                    <ButtonContainer>
                        <SimpleButton component="label" color="error" variant="contained" onClick={() => setOpenAlertDialog(true)}>
                            Excluir conta
                        </SimpleButton>
                    </ButtonContainer>
                </Grid>
            </Grid>

            <Modal
                open={openAlertDialog}
                onClose={() => setOpenAlertDialog(false)}
                aria-labelledby="dialogo-confirma-delete-titulo"
                aria-describedby="dialogo-confirma-delete-descricao"
            >
                <ModalDialog variant="outlined" role="alertdialog">
                    <ModalClose />
                    <DialogTitle id="dialogo-confirma-delete-titulo" sx={{ mb: 2 }}>
                        <WarningRoundedIcon />
                        Confirmação de deleção de conta
                    </DialogTitle>
                    <DialogContent>
                        <DialogContent id="dialogo-confirma-delete-descricao">
                            Você tem certeza que deseja deletar esta conta permanentemente?
                        </DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton
                            color='error'
                            // color="danger"
                            onClick={() => mutate()}
                            autoFocus
                            variant='contained'
                            loading={isLoading}
                            loadingPosition="center"
                        >
                            DELETAR
                            <DeleteForeverIcon sx={{ ml: 1 }} />
                        </LoadingButton>
                        <Button color="neutral" variant='outlined' onClick={() => setOpenAlertDialog(false)}>CANCELAR</Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default AccountEdit;
