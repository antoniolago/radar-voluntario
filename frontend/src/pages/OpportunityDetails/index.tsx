import BackButton from '@/components/BackButton';
import { Box, Button, Chip, Dialog, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InfoDetails, LocationDetails } from './styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { PageContainer } from '@/styles/styles';
import { OpportunityService } from '@/api/opportunity';
import ConfirmDialog from '@/components/ConfirmDialog';
import { RegistrationService } from '@/api/registration';
import { AuthService } from '@/api/auth';
import { getToken } from '@/api';
import { displayDateTime } from '@/utils/dateUtils';
import { getFullAddress } from '@/utils/addressUtils';
import Loading from '@/components/Loading';

const OpportunityDetails = () => {
    const { idInstitution, idOpportunity } = useParams();
    const { data: user, isLoading: isLoadingUser } = AuthService.useGetUser();
    const { data, isLoading } = OpportunityService.useGetPublishedOpportunity(idOpportunity ?? "");
    const { data: registration } = RegistrationService.useGetRegistration(idOpportunity ?? "");
    const { mutate: createRegistration } = RegistrationService.usePostRegistration();
    const { mutate: deleteRegistration } = RegistrationService.useDeleteRegistration();
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openRegisterLoginDialog, setOpenRegisterLoginDialog] = useState(false);

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
        return data.institution.owner_id === user?.id;
    }

    const getVacanciesLeft = () => {
        if (data.users != undefined) {
            return data.vacancies - data.users.length
        } else {
            return data.vacancies
        }
    }

    return (
        <PageContainer>
            <BackButton redirectTo={"/organizacao/" + idInstitution} />

            {isLoading || isLoadingUser ? (
                <Loading />
            ) : (
                (data == null || getVacanciesLeft() < 0) && (
                    "Oportunidade não encontrada."
                )
            )}

            {data != null && getVacanciesLeft() > 0 &&
                <>
                    <Typography mb={4} variant="h5" component="h2"> {data.name} </Typography>

                    <InfoDetails>
                        <Typography className="subtitle" variant="subtitle1">
                            Nome da Organização
                        </Typography>
                        <Typography variant="body1">
                            {data.institution && data.institution.name}
                        </Typography>
                    </InfoDetails>

                    <InfoDetails>
                        <Typography className="subtitle" variant="subtitle1">
                            Descrição
                        </Typography>

                        <Typography variant="body1">
                            {data.description}
                        </Typography>
                    </InfoDetails>


                    <InfoDetails>
                        <Typography className="subtitle" variant="subtitle1">
                            Vagas
                        </Typography>

                        <Typography variant="body1">
                            {getVacanciesLeft() > 1 ? getVacanciesLeft() + ' disponíveis' : getVacanciesLeft() + ' disponível'}
                        </Typography>
                    </InfoDetails>

                    <LocationDetails>
                        <div className="info">
                            <LocationOnIcon className="icon" /> <div><b> Local: </b>
                                {data.online ?
                                    'Online'
                                    :
                                    getFullAddress(data.address)
                                }
                            </div>
                        </div>
                        <div className="info">
                            <CalendarTodayIcon className="icon" /> <div><b>Inicio: </b>  {displayDateTime(data.start_date)} </div>
                        </div>
                        <div className="info">
                            <CalendarTodayIcon className="icon" /> <div><b>Fim: </b> {displayDateTime(data.start_date)} </div>
                        </div>
                    </LocationDetails>

                    <div style={{ marginTop: "2em", textAlign: "right" }}>
                        <Button component={Link} to={"/instituicao/" + 1} sx={{ marginRight: "1em" }} type="submit" size="large" color="primary" variant="outlined">
                            Sobre a Organização
                        </Button>
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

        </PageContainer>
    );
}

export default OpportunityDetails;

