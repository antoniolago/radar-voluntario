import BackButton from '@/components/BackButton';
import MapComponent from '@/components/MapComponent';
import { PageContainer } from '@/styles/styles';
import Box from '@mui/joy/Box/Box';
import { Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ContactDetails, VolunteerImage } from './styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import facebookLogo from '../../assets/facebook.svg';
import instagramLogo from '../../assets/instagram.svg';
import Table from "@/components/Table";

function VolunteerDetails() {
    const today: Date = new Date();

    const volunteer = {
        name: 'Nome voluntario',
        description: 'Sobre o voluntário. Lorem ipsum dolor sit amet. Ut magni debitis sit veniam enim sed adipisci vitae sit enim alias qui voluptatem eligendi ea eaque accusamus! Et facere tenetur ab esse asperiores et iste doloribus sit eius quaerat aut eaque ullam et ducimus illo quo adipisci quia. Sit maiores voluptatum et vitae quaerat ut Quis voluptatem qui illo maiores sed provident aliquid quo voluptatibus nisi At animi culpa.',
        instagram: 'https://www.instagram.com/s',
        facebook: 'https://www.facebook.com/s',
        phone: '(51) 99999-999',
    }

    const mockedInterests = ["Interesse 1", "Interesse 2", "Interesse 3"]
    const renderActions = (params: any) => {

        const activityDate: Date = new Date(params.row.activity_date);
        if (activityDate >= today) {
            return (
                <>
                    <IconButton aria-label="delete" color="error">
                        <CloseIcon />
                    </IconButton>
                    <IconButton onClick={() => console.log(params.row.id)} aria-label="confirm" color="success">
                        <CheckIcon />
                    </IconButton>
                </>
            )
        }

        return null;

    }

    const columns = [
        { field: 'opportunity', headerName: 'Oportunidade', flex: 1 },
        { field: 'registration_date', headerName: 'Data de inscrição', flex: 1 },
        { field: 'activity_date', headerName: 'Data de atividade', flex: 1 },
        {
            field: 'id',
            headerName: 'Ações',
            sortable: false,
            width: 180,
            renderCell: renderActions
        },
    ];
    const mockedRows = [
        { opportunity: 'Oportunidade nome 1', registration_date: '10/10/2010', activity_date: "12-10-2023", id: 1 },
        { opportunity: 'Oportunidade nome 2', registration_date: '10/10/2010', activity_date: "09-10-2023", id: 2 },
        { opportunity: 'Oportunidade nome 4', registration_date: '10/10/2010', activity_date: "12-12-2023", id: 4 },
        { opportunity: 'Oportunidade nome 4', registration_date: '10/10/2010', activity_date: "12-13-2023", id: 4 },
    ];
    const [data, setData] = useState<any>(mockedRows);

    return (
        <PageContainer>
            <BackButton redirectTo='/' />
            <Typography mb={5} variant="h5">
                Perfil do Voluntário
            </Typography>
            <Grid sx={{ display: "flex", justifyContent: "space-around" }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={5} >
                    <div style={{ textAlign: "center" }} >
                        <VolunteerImage src="/user.png" />
                        <Typography mb={4} variant="h6"> {volunteer.name} </Typography>
                    </div>
                    <Typography textAlign={"justify"} mb={4} variant="body1" component="p">
                        {volunteer.description}
                    </Typography>

                    <Typography mb={2} variant="h6"> Interesses </Typography>
                    <Stack mb={4} direction="row" spacing={1}>
                        {mockedInterests.map((interest) =>
                            <Chip label={interest} />
                        )}
                    </Stack>

                    <Typography mb={2} variant="h6"> Contatos </Typography>
                    <ContactDetails>
                        <div className="info">
                            <LocalPhoneIcon className="icon" /> <div> {volunteer.phone} </div>
                        </div>
                        <div className="info">
                            <a href={volunteer.instagram} target="_blank">
                                <img src={instagramLogo} />
                            </a>

                            <a href={volunteer.instagram} target="_blank">
                                <img src={facebookLogo} />
                            </a>
                        </div>

                    </ContactDetails>
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "column" }} item xs={6} sm={12} md={6} >
                    <Typography textAlign={"center"} mb={2} variant="h6">
                        Inscrições
                    </Typography>
                    {data.lenght > 0 ? (
                        <Table rows={data} columns={columns} />
                        ) : (
                            "Voluntário não está inscrito em nenhuma atividade"
                        )
                    }
                </Grid>
            </Grid>
        </PageContainer>

    )
}

export default VolunteerDetails