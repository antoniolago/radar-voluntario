import { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Opportunity } from '@/types/opportunity';
import { OpportunityService } from '@/api/opportunity';
import { InstitutionService } from '@/api/institution';
import AddressSelect from '@/components/AddressSelect';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button } from '@mui/joy';
import { IAddress } from '@/types/address';

interface OpportunityEditProps {
    setShowModal?: any;
    institutionId: string;
    opportunityId?: string;
}
const OpportunityEdit = (props: OpportunityEditProps) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [isOnline, setIsOnline] = useState<boolean>(false);

    const [address, setAddress] = useState<IAddress | undefined>();
    const { mutateAsync: createOpportunity } = OpportunityService.usePostOpportunity(() => props?.setShowModal(false));
    const { mutate: updateOpportunity } = OpportunityService.usePutOpportunity(() => props?.setShowModal(false));
    const { data: opportunity } = OpportunityService.useGetOpportunity(props.opportunityId ?? "0");

    useEffect(() => {
        if (props.opportunityId !== undefined && props.opportunityId !== "0") {
            reset({
                id: opportunity.id,
                name: opportunity.name,
                description: opportunity.description,
                vacancies: opportunity.vacancies,
                start_date: dayjs(opportunity.start_date),
                end_date: dayjs(opportunity.end_date),
                online: opportunity.online,
                published: opportunity.published,
                institution_id: opportunity.institution_id,
            });
            setStartDate(dayjs(opportunity.start_date));
            setEndDate(dayjs(opportunity.end_date));
            if (opportunity?.address) {
                setAddress(opportunity?.address)
            }

            if(opportunity.published){
                setIsPublished(true);
            }

            if(opportunity.online){
                setIsOnline(true);
            }
        }
    }, [opportunity])


    const onSubmit = (data: Opportunity, e: any) => {
        if (e.target.id != "form-new-opportunity") return;
        if (address != undefined) {
            data.address = address;
        }
        if (data.id) {
            updateOpportunity(data);
        } else {
            createOpportunity(data);
        }
    }

    const handleDateChange = (field: 'start_date' | 'end_date', date?: any) => {
        setValue(field, date.format())

        if (dayjs(getValues('start_date')).isAfter(dayjs(getValues('end_date')))) {
            setError('start_date', { type: 'custom', message: 'Insira um período válido' });
            setError('end_date', { type: 'custom', message: 'Insira um período válido' });
        } else {
            clearErrors(['end_date', 'start_date']);
        }
        if (field === 'start_date')
            setStartDate(dayjs(date));
        else
            setEndDate(dayjs(date));
    }

    const handleChangeIsPublished = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('published', event.target.checked)
        setIsPublished(event.target.checked)
    };

    const handleChangeIsOnline = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('online', event.target.checked)
        setIsOnline(event.target.checked)
    };

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

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)} id="form-new-opportunity">
                <input {...register("institution_id", { value: props.institutionId })} type="hidden" />
                <Grid container spacing={2.5} >
                    <Grid item xs={8}>
                        <TextField
                            {...register("name")}
                            name="name"
                            required
                            size='small'
                            fullWidth
                            label="Título"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 255 }} />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            {...register("vacancies", { valueAsNumber: true })}
                            name="vacancies"
                            label="Nr. de voluntários"
                            required
                            size='small'
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                                min: 1,
                            }}
                            type="number"
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("description")}
                            name="description"
                            size='small'
                            label="Descrição"
                            multiline
                            required
                            fullWidth
                            rows={3}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 1024 }} />

                    </Grid>

                    <Grid item md={6} sx={{
                        '.MuiFormHelperText-root': {
                            color: "red"
                        }
                    }}>

                        <DateTimePicker
                            label="Data e horário de inicio"
                            value={startDate}
                            sx={{ width: '100%' }}
                            slotProps={{
                                textField: {
                                    helperText: formState.errors.start_date?.message,
                                    required: true,
                                },
                            }}
                            onChange={(newDate) => handleDateChange('start_date', newDate)}
                        />

                    </Grid>
                    <Grid item md={6} sx={{
                        '.MuiFormHelperText-root': {
                            color: "red"
                        }
                    }}>                        <DateTimePicker
                            label="Data e horário de fim"
                            value={endDate}
                            sx={{ width: '100%' }}
                            slotProps={{
                                textField: {
                                    helperText: formState.errors.end_date?.message,
                                    required: true,
                                },
                            }}
                            onChange={(newDate) => handleDateChange('end_date', newDate)}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                        <FormControl sx={{ padding: "8.5px 14px" }}>
                            <FormControlLabel
                                control={<Switch
                                    onChange={handleChangeIsOnline}
                                    checked={isOnline}
                                    // {...register('online')}
                                />}
                                label="Atividade online" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ padding: "8.5px 14px" }}>
                            <FormControlLabel control={<Switch 
                            onChange={handleChangeIsPublished}
                            // {...register('published')}
                            checked={isPublished}
                            />} label="Publicar atividade" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>

                        {!watch('online') &&
                            <AddressSelect context="newActivity"
                                setAddress={setAddress}
                                selectedAddress={address}
                            />
                        }
                    </Grid>
                </Grid>

                <Grid>
                    <Grid style={{ textAlign: "right" }}>
                        <Button
                            color="primary"
                            variant='outlined'
                            onClick={() => props?.setShowModal(false)}
                            style={{ marginRight: "10px" }}
                        >
                            VOLTAR
                        </Button>
                        <Button variant='solid' type="submit"
                            form="form-new-opportunity"
                            id="form-new-opportunity-btn">
                            SALVAR
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box >
    );
}

export default OpportunityEdit;
