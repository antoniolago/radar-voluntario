import BackButton from '@/components/BackButton';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InfoDetails, LocationDetails } from './styles';
import Visibility from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { PageContainer } from '@/styles/styles';
import { OpportunityService } from '@/api/opportunity';

const OpportunityDetails = () => {
    const { id } = useParams();
    const { data } = OpportunityService.useGetPublishedOpportunity(id ?? "");
    // const mockedCategories = ["Categoria 1", "Categoria 2", "Categoria 3"]

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
                        <Button type="submit" size="large" color="primary" variant="contained">
                            Voluntariar para oportunidade
                        </Button>
                    </div>

                </>
            ) : (
                "Oportunidade não encontrada"
            )

            }
        </PageContainer>
    );
}

export default OpportunityDetails;
