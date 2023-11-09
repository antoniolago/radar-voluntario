import { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FooterButton, FormContainer, InputGroup } from '../ProfileEdit/styles';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';
import { PageContainer } from '@/styles/styles';
import { useForm } from 'react-hook-form';
import { Opportunity } from '@/types/opportunity';
import { OpportunityService } from '@/api/opportunity';
import { InstitutionService } from '@/api/institution';

const OpportunityEdit = () => {
    const { id } = useParams();
    const [onlineOpportunity, setOnlineOpportunity] = useState(false);
    const [addressId, setAddressId] = useState('');

    const { data: institutionData } = InstitutionService.useGetInstitution();
    const { mutate: createOpportunity } = OpportunityService.usePostOpportunity();
    const { mutate: updateOpportunity } = OpportunityService.usePutOpportunity(id ?? '');
    
    const { data: opportunityData } = id != undefined ? OpportunityService.useGetOpportunity(id) : { data: null };

    useEffect(() => {
        if (opportunityData != null) {
            setValue('id', opportunityData.id);
            setValue('name', opportunityData.name);
            setValue('description', opportunityData.description);
            setValue('vacancies', opportunityData.vacancies);
            setValue('start_date', opportunityData.start_date);
            setValue('end_date', opportunityData.end_date);
            setValue('online', opportunityData.online);
            setValue('published', opportunityData.published);
        }
    }, [opportunityData])

    useEffect(() => {
        if (institutionData != undefined && institutionData.length > 0) {
            setValue('institution_id', institutionData[0]!.id!);
        }
    }, [institutionData])

    const handleChangeOnineOpportinity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlineOpportunity(event.target.checked);
    };

    const onSubmit = async (data: Opportunity) => {
        if(data.id) {
            updateOpportunity(data);
        }else{
            createOpportunity(data);
        }
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
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >
                    {id && <input {...register("id", { value: '' })} type="hidden" />}
                    <input {...register("institution_id", { value: '' })} type="hidden" />
                    {/* <input {...register("address_id", {value: '1'})} type="hidden" /> */}

                    <TextField
                        {...register("name")}
                        name="name"
                        required
                        label="Título"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ maxLength: 255 }} />
                    <TextField
                        {...register("description")}
                        name="description"
                        label="Descrição"
                        multiline
                        required
                        rows={5}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ maxLength: 1024 }} />

                    <TextField
                        {...register("vacancies", { valueAsNumber: true })}
                        name="vacancies"
                        label="Número de voluntários"
                        required
                        InputLabelProps={{ shrink: true }}
                        type="number"
                    />

                    <FormControl>
                        <FormControlLabel control={<Switch {...register('published')} />} label="Publicar oportunidade" />
                    </FormControl>

                    <InputGroup>
                        <TextField
                            required
                            {...register("start_date")}
                            name="start_date"
                            label="Date e horário início"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}/>
                        <TextField
                            {...register("end_date")}
                            name="end_date"
                            required
                            label="Date e horário fim"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined" />
                    </InputGroup>
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6}>
                    <FormControl sx={{ padding: "8.5px 14px" }}>
                        <FormControlLabel
                            control={<Switch
                                {...register('online')} 
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
