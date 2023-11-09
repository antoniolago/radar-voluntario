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
import { RegistrationService } from '@/api/registrations';

const OpportunityDetails = () => {
    const { id } = useParams();
    const { data } = OpportunityService.useGetPublishedOpportunity(id ?? "");
    const { mutate: createRegistration } = RegistrationService.usePostRegistration();
    

    // const mockedCategories = ["Categoria 1", "Categoria 2", "Categoria 3"]
    const [openAlertDialog, setOpenAlertDialog] = useState(false);

    const onRegistrationClick = () => {
        setOpenAlertDialog(false);
        createRegistration(data.id)
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
                            - Verificar se usuário está logado
                            - Verificar se usuário já está cadastrado na oportunidade
                            - Verificar se usuário não é dono da instituição, nesse caso não permitir o cadastro 
                        */}

                        <Button onClick={() => setOpenAlertDialog(true)} size="large" color="primary" variant="contained">
                            Voluntariar para oportunidade
                        </Button>
                    </div>

                </>
            ) : (
                "Oportunidade não encontrada"
            )}

            <ConfirmDialog 
                title={"Voluntariar para oportunidade"}
                description={"Deseja se cadastrar como voluntário para esta oportunidade? Ao fazer isso, a organização terá acesso aos seus dados de contato."}
                confirmText={"Voluntariar"}
                open={openAlertDialog} 
                setOpen={setOpenAlertDialog} 
                handleClick={onRegistrationClick}/>            

        </PageContainer>
    );
}

export default OpportunityDetails;
