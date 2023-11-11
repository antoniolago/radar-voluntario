import { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FooterButton, FormContainer, InputGroup } from '../ProfileEdit/styles';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';
import { PageContainer } from '@/styles/styles';
import { useForm } from 'react-hook-form';
import { Opportunity } from '@/types/opportunity';
import { OpportunityService } from '@/api/opportunity';
import { InstitutionService } from '@/api/institution';
import AddressSelect from '@/components/AddressSelect';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

const OpportunityEdit = () => {
    const { id } = useParams();
    const [onlineOpportunity, setOnlineOpportunity] = useState(false);
    const [addressId, setAddressId] = useState('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const [opportunity, setOpportunity] = useState<Opportunity>({} as Opportunity);

    const { data: institutionData } = InstitutionService.useGetInstitution();
    const { mutateAsync: createOpportunity } = OpportunityService.usePostOpportunity();
    const { mutate: updateOpportunity } = OpportunityService.usePutOpportunity();
    const { data: opportunityData } = id != undefined ? OpportunityService.useGetOpportunity(id) : { data: null };

    useEffect(() => {
        if (opportunity != null) {
            setValue('id', opportunity.id);
            setValue('name', opportunity.name);
            setValue('description', opportunity.description);
            setValue('vacancies', opportunity.vacancies);
            setValue('start_date', opportunity.start_date);
            setValue('end_date', opportunity.end_date);
            setValue('online', opportunity.online);
            setValue('published', opportunity.published);

            setStartDate(dayjs(opportunity.start_date));
            setEndDate(dayjs(opportunity.end_date));
        }
    }, [opportunity])

    useEffect(() => {
        if (institutionData != undefined && institutionData.length > 0) {
            setValue('institution_id', institutionData[0]!.id!);
        }
    }, [institutionData])

    useEffect(() => {
        if (opportunityData != null) {
            setOpportunity(opportunityData);
        }
    }, [opportunityData])

    const handleChangeOnineOpportinity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlineOpportunity(event.target.checked);
    };

    const onSubmit = async (data: Opportunity) => {
        if (data.id) {
            updateOpportunity(data);
        } else {
            const newData = await createOpportunity(data);
            setOpportunity(newData);
        }
    }

    const handleDateChange = (field: 'start_date' | 'end_date', date?: any) => {
        setValue(field, date.format())
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
        <Paper elevation={2} >
            <BackButton redirectTo="/oportunidades" />



            <Typography mb={5} variant="h5">
                {id ? 'Editar' : 'Cadastrar'} oportunidade
            </Typography>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1} > 
                    {opportunity != null && <input {...register("id", { value: '' })} type="hidden" />}
                    <input {...register("institution_id", { value: '' })} type="hidden" />
                    {/* <input {...register("address_id", {value: '1'})} type="hidden" /> */}

                    <Grid item md={6}>
                        <TextField
                            {...register("name")}
                            name="name"
                            required
                            fullWidth
                            label="Título"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 255 }} />

                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            {...register("description")}
                            name="description"
                            label="Descrição"
                            multiline
                            required
                            rows={5}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 1024 }} />

                    </Grid>
                    <Grid item md={6}>
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

                    </Grid>
                    <Grid item md={6}>
                        <DateTimePicker
                            label="Date e horário de inicio"
                            value={startDate}
                            onChange={(newDate) => handleDateChange('start_date', newDate)}
                        />

                    </Grid>
                    <Grid item md={6}>
                        <DateTimePicker
                            label="Date e horário de fim"
                            value={endDate}
                            onChange={(newDate) => handleDateChange('end_date', newDate)}
                        />
                        {/* <TextField
                            {...register("end_date")}
                            name="end_date"
                            required
                            label="Date e horário fim"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined" /> */}

                    </Grid>
                    <Grid container>

                        <Grid item xs={6} sm={12} md={6}>
                            <FormControl sx={{ padding: "8.5px 14px" }}>
                                <FormControlLabel
                                    control={<Switch
                                        {...register('online')}
                                        checked={onlineOpportunity}
                                        onChange={handleChangeOnineOpportinity}
                                    />}
                                    label="Oportunidade online" />
                            </FormControl>


                        </Grid>
                        <Grid item md={6}>

                            {!onlineOpportunity &&
                                <AddressSelect context="newActivity" />
                            }

                        </Grid>
                    </Grid>
                </Grid>
                <FooterButton>
                    <Button type="submit" size="large" color="success" variant="contained">
                        Salvar
                    </Button>
                </FooterButton>
            </FormContainer>
        </Paper>
    );
}

export default OpportunityEdit;
