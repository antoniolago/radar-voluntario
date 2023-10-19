import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { FooterButton, FormContainer } from '../../pages/InstitutionEdit/styles';
import { ButtonContainer } from './styles';
import { toast } from 'sonner';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlertDialog from '../AlertDialog';

function AccountEdit() {

    const [email, setEmail] = useState('');
    const [emailCopy, setEmailCopy] = useState('');
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCopy, setShowPasswordCopy] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordCopy, setPasswordCopy] = useState('');

    const areValuesEqual = (value1: string, value2: string) => {
        return value1 === value2;
    }

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!areValuesEqual(email, emailCopy)) {
            toast.error("Emails não são iguais")
            return;
        }
        toast.success('Perfil atualizado');
    }

    const onSubmitPassword = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!areValuesEqual(password, passwordCopy)) {
            toast.error("Senhas não são iguais")
            return;
        }
        setOpenPasswordDialog(false);
        toast.success('Senha atualizada');
    }

    const handleClickPassword = () => {
        setPassword('');
        setPasswordCopy('');
        setOpenPasswordDialog(true);
    };

    const handleDialogClose = (setState: (value: boolean) => void) => () => {
        setState(false);
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handlePasswordCopyVisibility = () => {
        setShowPasswordCopy(!showPasswordCopy);
    };

    const deleteAccount = () => {
        alert("Conta excluída");
        setOpenAlertDialog(false);
    }

    return (
        <>
            <FormContainer onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >
                        <TextField required id="outlined-basic" onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" label="Email" variant="outlined" />
                        <TextField required onChange={(e) => { setEmailCopy(e.target.value) }} id="outlined-basic" value={emailCopy} type="email" label="Confirmar email" variant="outlined" />
                        <ButtonContainer>
                            <Button component="label" variant="contained" onClick={handleClickPassword}>
                                Alterar senha
                            </Button>
                            <Button component="label" color="error" variant="contained" onClick={() => setOpenAlertDialog(true)}>
                                Excluir conta
                            </Button>
                        </ButtonContainer>
                    </Grid>
                </Grid>
                <FooterButton>
                    <Button type="submit" size="large" color="success" variant="contained">
                        Salvar
                    </Button>
                </FooterButton>
            </FormContainer>

            <Dialog open={openPasswordDialog} onClose={handleDialogClose(setOpenPasswordDialog)}>
                <DialogTitle>Alterar senha</DialogTitle>
                <FormContainer onSubmit={onSubmitPassword}>
                    <DialogContent sx={{ width: "500px" }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nova senha"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            value={password}
                            variant="outlined"
                            onChange={(e) => { setPassword(e.target.value) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={(handlePasswordVisibility)} edge="end">
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nova senha"
                            type={showPasswordCopy ? 'text' : 'password'}
                            fullWidth
                            value={passwordCopy}
                            onChange={(e) => { setPasswordCopy(e.target.value) }}
                            required
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={(handlePasswordCopyVisibility)} edge="end">
                                            {showPasswordCopy ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" variant="contained" onClick={handleDialogClose(setOpenPasswordDialog)}>Cancelar</Button>
                        <Button color="success" variant="contained" type="submit">Salvar</Button>
                    </DialogActions>
                </FormContainer>
            </Dialog>

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
