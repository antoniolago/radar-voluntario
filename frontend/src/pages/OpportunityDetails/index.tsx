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

const OpportunityDetails = () => {
    const { id } = useParams();
    const { data } = OpportunityService.useGetPublishedOpportunity(id ?? "");
    const { mutate: createRegistration } = RegistrationService.usePostRegistration();
    const { data: registration } = RegistrationService.useGetRegistration(id ?? "");
    const { mutate: deleteRegistration } = RegistrationService.useDeleteRegistration();
    // const mockedCategories = ["Categoria 1", "Categoria 2", "Categoria 3"]
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openRegisterLoginDialog, setOpenRegisterLoginDialog] = useState(false);
    const { data: user, isLoading: isLoadingUser } = AuthService.useGetUser();

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
        return false;
    }

    return (
        <PageContainer>
            <BackButton redirectTo="/" />

            {data != null ? (
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

                    Vagas: 2 disponíveis

                    {/* <Stack direction="row" spacing={1}>
                        {mockedCategories.map((category) =>
                            <Chip label={category} />
                        )}
                    </Stack> */}

                    <LocationDetails>
                        <div className="info">
                            <LocationOnIcon className="icon" /> <div><b> Local: </b> Endereço x</div>
                        </div>
                        <div className="info">
                            <CalendarTodayIcon className="icon" /> <div><b>Data e hora inicio: </b>  {data.start_date}</div>
                        </div>
                        <div className="info">
                            <CalendarTodayIcon className="icon" /> <div><b>Data e hora fim: </b>  {data.end_date} </div>
                            {/* <WatchLaterIcon className="icon" /> <div><b>Hora: </b> 18:00 - 21:00</div> */}
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
                               ( <Button onClick={() => setOpenRegisterLoginDialog(true)} size="large" color="primary" variant="contained">
                                    Voluntariar para oportunidade
                                </Button>)
                        }
                    </div>

                </>
            ) : (
                "Oportunidade não encontrada"
            )}

            <ConfirmDialog
                title={"Atenção!"}
                description={"Você precisa fazer login na plataforma para realizar esta ação."}
                confirmText={"Ok"}
                open={openRegisterLoginDialog}
                setOpen={setOpenRegisterLoginDialog}
                hideCancelBtn={true}
                handleClick={()=>{setOpenRegisterLoginDialog(false)}} />

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

