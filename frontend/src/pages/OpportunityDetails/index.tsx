import BackButton from '@/components/BackButton';
import { Box, Breadcrumbs, Button, Chip, Dialog, Link, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { InfoDetails, LocationDetails } from './styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import { PageContainer } from '@/styles/styles';
import { OpportunityService } from '@/api/opportunity';
import ConfirmDialog from '@/components/ConfirmDialog';
import { RegistrationService } from '@/api/registration';
import { AuthService } from '@/api/auth';
import { getToken } from '@/api';
import { displayDateTime } from '@/utils/dateUtils';
import { getFullAddress } from '@/utils/addressUtils';
import Loading from '@/components/Loading';
import { Grid } from '@mui/joy';
import MapComponent from '@/components/MapComponent';
import { LatLngExpression } from 'leaflet';

interface OpportunityDetailsProps {
    id?: string | undefined;
}
const OpportunityDetails = (props: OpportunityDetailsProps) => {
    const navigate = useNavigate();
    const [openConfirmDeletionAlert, setOpenConfirmDeletionAlert] = useState<boolean>(false);
    const { idInstitution, idOpportunity } = useParams();
    const idOpp = props?.id != undefined ? props.id : idOpportunity;
    const { data: user, isLoading: isLoadingUser } = AuthService.useGetUser();
    const { data, isLoading } = OpportunityService.useGetOpportunity(idOpp ?? "");
    const { data: registration } = RegistrationService.useGetRegistration(idOpp ?? "");
    const { mutate: createRegistration } = RegistrationService.usePostRegistration();
    const { mutate: deleteRegistration } = RegistrationService.useDeleteRegistration();
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openRegisterLoginDialog, setOpenRegisterLoginDialog] = useState(false);

    const { data: curUser } = AuthService.useGetUser();
    const isUserOwner = data?.institution?.owner_id == curUser?.id
    const onRegistrationClick = () => {
        setOpenRegisterDialog(false);
        createRegistration({ opportunity_id: data.id })
    }

    const onRemoveRegistrationClick = () => {
        setOpenDeleteDialog(false);
        deleteRegistration(registration.id)
    }

    const registrationExists = () => {
        return registration === undefined || registration === null || Object.keys(registration).length === 0;
    }

    const isDisabled = () => {
        return data?.institution?.owner_id === user?.id;
    }

    const getVacanciesLeft = () => {
        if (data.users != undefined) {
            return data.vacancies - data.users.length
        } else {
            return data.vacancies
        }
    }

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            {idInstitution != undefined &&
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate("/organizacoes")}>
                        Organizações
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate("/organizacao/" + data.institution_id)}>
                        {data.institution?.name}
                    </Link>
                    {/* <Link
                        underline="hover"
                        color="primary"
                        onClick={() => navigate("/organizacao/"+data.institution_id+"/opportunities")}>
                        Atividades
                    </Link> */}
                    <Typography color="text.primary">{data?.name}</Typography>
                </Breadcrumbs>
            }
            {isLoading || isLoadingUser ? (
                <Loading />
            ) : (
                (data == null || getVacanciesLeft() < 0) && (
                    "Oportunidade não encontrada."
                )
            )}

            {data != null && getVacanciesLeft() > 0 &&
                <>
                    <Typography
                        sx={{ textAlign: "center" }}
                        m={1}
                        variant="h5"
                        component="h2">
                        {data.name}
                        {isUserOwner &&
                            <>
                                <Button
                                    variant='text'
                                    sx={{ ml: 1, p: '0 3px' }}
                                    size='small'
                                    color="warning"
                                    onClick={() => navigate("edit")}>
                                    <EditIcon />
                                </Button>
                                <Button
                                    variant='text'
                                    sx={{ ml: 1, p: '0 3px' }}
                                    size='small'
                                    color="error"
                                    onClick={() => setOpenConfirmDeletionAlert(true)}>
                                    <DeleteForeverIcon />
                                </Button>
                            </>
                        }
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <Typography variant="caption">
                                Organizado por:
                            </Typography>
                            <Typography variant="h6">
                                {data.institution && data.institution.name}
                            </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Typography variant="caption">
                                Descrição:
                            </Typography>
                            <Typography variant="h6">
                                {data.description}
                            </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Typography variant="caption">
                                Vagas
                            </Typography>
                            <Typography variant="h6">
                                {getVacanciesLeft() > 1 ? getVacanciesLeft() + ' disponíveis' : getVacanciesLeft() + ' disponível'}
                            </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{ display: 'flex' }}>
                                <CalendarTodayIcon sx={{ fontSize: '15px', mr: 1 }} className="icon" />
                                <Typography variant="caption">
                                    Quando
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    {/* <b>Inicio: </b>   */}
                                    {displayDateTime(data.start_date)}
                                </Typography>
                                <Typography variant="h6" sx={{ mr: 2 }}>
                                    Até
                                </Typography>
                                <Typography variant="h6">
                                    {/* <b>Fim: </b>  */}
                                    {displayDateTime(data.start_date)}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{ display: 'flex' }}>
                                <LocationOnIcon sx={{ fontSize: '15px', mr: 1 }} className="icon" />
                                <Typography variant="caption">
                                    Local
                                </Typography>
                            </Box>
                            <Typography variant="h6">
                                {data.online ?
                                    'Online'
                                    :
                                    getFullAddress(data.address)
                                }
                            </Typography>
                            <Box sx={{height: '200px'}}>
                                <MapComponent previewMode position={{ lat: data.address?.latitude, lng: data.address?.longitude } as LatLngExpression} />

                            </Box>
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: "2em", textAlign: "right" }}>
                        {/* <Button onClick={() => navigate("/organizacao/" + idInstitution)} sx={{ marginRight: "1em" }} type="submit" size="large" color="primary" variant="outlined">
                            Perfil da Organização
                        </Button> */}
                        {/* <Button onClick={() => navigate("/organizacao/" + idInstitution)} sx={{ marginRight: "1em" }} type="submit" size="large" color="primary" variant="outlined">
                            Fechar
                        </Button> */}
                        {/* TODO:
                            - Verificar se usuário não é dono da instituição, nesse caso não permitir o cadastro 
                        */}
                        {

                            user?.name != undefined && getToken() != "" ?
                                (<>
                                    {registrationExists() ? (
                                        <Button disabled={isDisabled()} onClick={() => setOpenRegisterDialog(true)} size="large" color="primary" variant="contained">
                                            Voluntariar para oportunidade
                                        </Button>
                                    ) : (
                                        <Button onClick={() => setOpenDeleteDialog(true)} size="large" color="error" variant="contained">
                                            Remover inscrição de oportunidade
                                        </Button>
                                    )}
                                </>)
                                :
                                (<Button onClick={() => setOpenRegisterLoginDialog(true)} size="large" color="primary" variant="contained">
                                    Voluntariar para oportunidade
                                </Button>)
                        }
                    </div>

                </>
            }

            <ConfirmDialog
                title={"Atenção!"}
                description={"Você precisa fazer login na plataforma para realizar esta ação."}
                confirmText={"Ok"}
                open={openRegisterLoginDialog}
                setOpen={setOpenRegisterLoginDialog}
                hideCancelBtn={true}
                handleClick={() => { setOpenRegisterLoginDialog(false) }} />

            <ConfirmDialog
                title={"Voluntariar para oportunidade"}
                description={"Deseja se cadastrar como voluntário para esta oportunidade? Ao fazer isso, a organização terá acesso aos seus dados de contato."}
                confirmText={"Voluntariar"}
                open={openRegisterDialog}
                setOpen={setOpenRegisterDialog}
                handleClick={onRegistrationClick} />


            <ConfirmDialog
                title={"Remover inscrição de oportunidade"}
                description={"Tem certeza que deseja remover inscrição nesta oportunidade."}
                confirmText={"Remover"}
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                handleClick={onRemoveRegistrationClick} />

        </Paper>
    );
}

export default OpportunityDetails;

