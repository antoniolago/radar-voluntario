import { useState, useRef, useEffect } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FooterButton, FormContainer, InputGroup, VisuallyHiddenInput } from '../../pages/ProfileEdit/styles';
import { PreviewImage, ImageContainer } from './styles';
import MaskedTextField from 'react-masked-mui-textfield';
import { toast } from 'sonner';
import { AuthService } from '@/api/auth';
import { User } from '@/types/user';
import { useForm } from 'react-hook-form';

const VolunteerForm = () => {

    const { data: user } = AuthService.useGetUser();
    const { mutate: updateUser } = AuthService.useUpdateUser();
    
    
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<User>({
        shouldFocusError: true,
    });

	useEffect(() => {
        reset({
            about: user?.about,
            facebook: user?.facebook,
            instagram: user?.instagram,
            phone: user?.phone
        });
	}, [user])

    const onSubmit = (data: User, e: any) => {
		e.preventDefault();
		e.stopPropagation();
	
		updateUser(data);
	}


    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >

                    <ImageContainer>
                        {user?.picture ? (
                            <PreviewImage src={user?.picture} />
                        ) : (
                            <PreviewImage src="/user.png" />
                        )}
                    </ImageContainer>

                    <TextField
                        required
                        disabled
                        value={user?.name}
                        size='small'
                        defaultValue={user?.name || "..."}
                        label="Nome"
                        variant="outlined"
                        {...register("name")}
                    />
                    <TextField
                        label="Sobre"
                        multiline
                        required
                        rows={2}
                        {...register("about")}
                        inputProps={{ maxLength: 1024 }} 
                        InputLabelProps={{ shrink: true }}/>

                    <MaskedTextField
                        size="small"
                        required={true}
                        label="Telefone"
                        placeholder="(00) 00000-0000"
                        mask="(00) 00000-0000"
                        {...register("phone")}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6}>
                    <Typography fontWeight={600} variant="subtitle1">Redes sociais</Typography>
                    <TextField
                        label="Facebook"
                        variant="outlined"
                        size='small'
                        {...register("facebook")}
                        inputProps={{ maxLength: 255 }}
                        InputLabelProps={{ shrink: true }} />

                    <TextField
                        label="Instagram"
                        variant="outlined"
                        size='small'
                        {...register("instagram")}
                        inputProps={{ maxLength: 255 }} 
                        InputLabelProps={{ shrink: true }}/>
                </Grid>
            </Grid>
            <FooterButton>
                <Button
                    type="submit"
                    size="large"
                    color="primary"
                    variant="contained">
                    Salvar
                </Button>
            </FooterButton>
        </FormContainer>
    );
}

export default VolunteerForm;
