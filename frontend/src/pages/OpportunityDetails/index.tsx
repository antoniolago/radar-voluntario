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

const OpportunityDetails = () => {
    const { id } = useParams();

    const mockedCategories = ["Categoria 1", "Categoria 2", "Categoria 3"]

    return (
        <PageContainer>
            <BackButton redirectTo="/" />
            <Typography mb={4} variant="h5" component="h2"> Título oportunidade {id}</Typography>

            <InfoDetails>
                <Typography className="subtitle" variant="subtitle1">
                    Nome da Organização
                </Typography>
                <Typography variant="body1">
                    Nome da Organização
                </Typography>
            </InfoDetails>

            <InfoDetails>
                <Typography className="subtitle" variant="subtitle1">
                    Descrição
                </Typography>

                <Typography variant="body1">
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Donec ornare quam eu ipsum venenatis,
                    ut dapibus nisl suscipit. Praesent ante magna, pharetra eget dignissim at,
                    {/* posuere a leo. Donec non lorem egestas, faucibus lectus nec, auctor erat. Sed sit amet nibh a lectus ornare blandit. Fusce ac nunc sed mi tincidunt sagittis. Praesent aliquet, odio in rutrum porttitor, lorem magna bibendum magna, et tincidunt magna metus eu leo. Aliquam interdum molestie mattis. Suspendisse magna felis, volutpat nec diam vel, tincidunt rutrum est. Donec molestie, libero et dapibus tincidunt, nisl tellus ornare turpis, nec dictum nisl nibh nec tortor.  */}
                </Typography>
            </InfoDetails>
            <Stack direction="row" spacing={1}>
                {mockedCategories.map((category) =>
                    <Chip label={category} />
                )}
            </Stack>

            <LocationDetails>
                <div className="info">
                    <CalendarTodayIcon className="icon" /> <div><b> Local: </b> Endereço x</div>
                </div>
                <div className="info">
                    <LocationOnIcon className="icon" /> <div><b>Data: </b> 10/12/2023</div>
                </div>
                <div className="info">
                    <WatchLaterIcon className="icon" /> <div><b>Hora: </b> 18:00 - 21:00</div>
                </div>
            </LocationDetails>

            <div style={{  marginTop: "2em", textAlign: "right" }}>
                <Button component={Link} to={"/instituicao/"+1} sx={{ marginRight: "1em" }} type="submit" size="large" color="primary" variant="outlined">
                    Sobre a Organização
                </Button>
                <Button type="submit" size="large" color="primary" variant="contained">
                    Voluntariar para oportunidade
                </Button>
            </div>
            </PageContainer>  
    );
}

export default OpportunityDetails;
