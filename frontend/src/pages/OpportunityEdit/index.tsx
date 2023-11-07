import { useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FooterButton, FormContainer, InputGroup } from '../ProfileEdit/styles';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';
import { PageContainer } from '@/styles/styles';
import { useForm } from 'react-hook-form';
import { Opportunity } from '@/types/opportunity';

const OpportunityEdit = () => {
    const { id } = useParams();
    const [onlineOpportunity, setOnlineOpportunity] = useState(false);
    const [addressId, setAddressId] = useState('');


    const handleChangeOnineOpportinity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlineOpportunity(event.target.checked);
    };

    const onSubmit = async (data: any) => {
		toast.success('Oportunidade cadastrada');
	}

	const {
		register,
		setError,
		clearErrors,
		formState: { errors },
		handleSubmit,
		control,
		setValue,
		getValues,
		formState,
		watch,
		reset,
	} = useForm<Opportunity>({
		shouldFocusError: true,
	});
	const { isDirty, dirtyFields } = formState;
	var form = {
		register,
		setError,
		clearErrors,
		errors,
		handleSubmit,
		control,
		setValue,
		watch,
		getValues,
		isDirty,
	};

    return (
        <PageContainer>
            <BackButton redirectTo="/oportunidades" />

            <Typography mb={5} variant="h5">
                {id ? 'Editar' : 'Cadastrar'} oportunidade
            </Typography>
            <FormContainer onSubmit={onSubmit}>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >

                        <TextField
                            {...register("name")}
                            name="name"
                            required
                            label="Título"
                            variant="outlined"
                            inputProps={{ maxLength: 255 }} />
                        <TextField
                            {...register("description")}
                            name="description"
                            label="Descrição"
                            multiline
                            required
                            rows={5}
                            defaultValue=""
                            inputProps={{ maxLength: 1024 }} />

                        <TextField
                            {...register("vacancies")}
                            name="vacancies"
                            label="Número de voluntários"
                            required
                            type="number"
                        />

                        <FormControl>
                            <FormControlLabel control={<Switch defaultChecked />} label="Publicar oportunidade" />
                        </FormControl>

                        <FormControl >
                            <InputLabel>Categorias</InputLabel>
                            <Select label="Organização">
                                {/* {interestsList.map((interest) =>
                                <MenuItem value={interest.value}>{interest.label}</MenuItem>
                            )} */}
                            </Select>
                        </FormControl>

                        {/* TODO: add datepicker */}
                        <TextField
                            {...register("date")}
                            name="date"
                            label="Data"
                            multiline
                            required
                            inputProps={{ maxLength: 10 }} />

                        <InputGroup>
                            <TextField
                                required
                                {...register("start_time")}
                                name="start_time"
                                label="Hora início"
                                variant="outlined" />
                            <TextField
                                {...register("end_time")}
                                name="end_time"
                                required
                                label="Hora fim"
                                variant="outlined" />
                        </InputGroup>
                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6}>
                        <FormControl sx={{padding :"8.5px 14px" }}>
                            <FormControlLabel
                                control={<Switch
                                    checked={onlineOpportunity}
                                    onChange={handleChangeOnineOpportinity}
                                    defaultChecked />}
                                label="Oportunidade online" />
                        </FormControl>

                        {!onlineOpportunity &&
                            <>
                                <FormControl >
                                    <InputLabel>Endereço</InputLabel>
                                    <Select
                                        onChange={(e) => (setAddressId(e.target.value))}
                                        value={addressId}
                                        label="Organização">
                                        <MenuItem value={'1'}>Rua x, Bairro, Cidade - UF</MenuItem>
                                        <MenuItem value={'0'}>Outro</MenuItem>
                                    </Select>
                                </FormControl>

                                {addressId === '0' &&
                                    <>
                                        <TextField
                                            required
                                            label="CEP"
                                            variant="outlined" />
                                        <TextField
                                            required
                                            label="Endereço"
                                            variant="outlined"
                                            inputProps={{ maxLength: 255 }} />

                                        <TextField
                                            required
                                            label="Bairro"
                                            variant="outlined"
                                            inputProps={{ maxLength: 255 }} />

                                        <InputGroup>
                                            <TextField
                                                required
                                                label="UF"
                                                variant="outlined" />
                                            <TextField
                                                required
                                                label="Cidade"
                                                variant="outlined" />
                                        </InputGroup>
                                    </>

                                }
                            </>

                        }


                    </Grid>
                <FooterButton>
                    <Button type="submit" size="large" color="success" variant="contained">
                        Salvar
                    </Button>
                </FooterButton>
            </FormContainer>
        </PageContainer>
    );
}

export default OpportunityEdit;
