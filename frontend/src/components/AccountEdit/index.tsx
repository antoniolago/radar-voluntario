import { Button, Grid, Typography } from '@mui/material';
import { ButtonContainer } from './styles';
import { useState } from 'react';
import AlertDialog from '../ConfirmDialog';
import { AuthService } from '@/api/auth';

function AccountEdit() {
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { mutate } = AuthService.useDeleteUser();

    const deleteAccount = () => {
        mutate();
    }

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={12} >
                    
                    <Typography mb={1}>
                        Ao excluir a conta, todos os seus dados serão permanentemente removidos e não poderão ser recuperados.
                    </Typography>

                    <ButtonContainer>
                        <Button component="label" color="error" variant="contained" onClick={() => setOpenAlertDialog(true)}>
                            Excluir conta
                        </Button>
                    </ButtonContainer>
                </Grid>
            </Grid>

            <AlertDialog 
                title={"Excluir conta"}
                description={"Você tem certeza que deseja excluir a conta?"}
                confirmText={"Sim, excluir conta"}
                open={openAlertDialog} 
                setOpen={setOpenAlertDialog} 
                handleClick={deleteAccount}/>
        </>
    )
}

export default AccountEdit;
