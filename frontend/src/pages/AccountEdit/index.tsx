import { Button, Grid, TextField, Typography } from '@mui/material';
import { FooterButton, FormContainer } from '../InstitutionEdit/styles';
import { ButtonContainer } from './styles';

function AccountEdit() {
    return (
        <>
            <FormContainer>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >
                        <TextField id="outlined-basic" type="email" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" type="email" label="Confirmar email" variant="outlined" />
                        <ButtonContainer>
                            <Button component="label" variant="contained">
                                Alterar senha
                            </Button>
                            <Button component="label" color="error" variant="contained">
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
        </>
    )
}

export default AccountEdit;
