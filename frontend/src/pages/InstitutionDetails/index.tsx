import OportunitiesList from '@/components/OpportunitiesList';
import { Breadcrumbs, Grid, Link, Paper, Typography } from '@mui/material';
import BackButton from '@/components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer } from '@/styles/styles';
import { InsitutionImage, SocialMedialList } from './styles';
import facebookLogo from '../../assets/facebook.svg';
import instagramLogo from '../../assets/instagram.svg';
import { InstitutionService } from '@/api/institution';
import { Button } from '@mui/joy';

function InstitutionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: institution,
        isLoading,
        isError
    } = InstitutionService.useGetInstitution(id);

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            {/* <BackButton redirectTo='/organizacoes' /> */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate("/organizacoes")}>
                    Organizações
                </Link>
                <Typography color="text.primary">{institution?.name}</Typography>
            </Breadcrumbs>
            {institution != undefined &&
                <>
                    <Typography
                        sx={{ textAlign: "center" }}
                        m={1}
                        variant="h5"
                        component="h2">
                        {institution.name}
                        <Button 
                            variant='outlined'
                            sx={{ml: 3}}
                            color="warning"
                            onClick={() => navigate("edit")}>
                            Editar
                        </Button>
                    </Typography>
                    <Typography sx={{ textAlign: "justify" }} variant="body1" component="p"> {institution.about} </Typography>

                    <SocialMedialList>
                        {institution.facebook &&
                            <a href={institution.facebook} target="_blank">
                                <img src={facebookLogo} />
                            </a>
                        }

                        {institution.instagram &&
                            <a href={institution.instagram} target="_blank">
                                <img src={instagramLogo} />
                            </a>
                        }
                    </SocialMedialList>
                    {/* TEMPORARY DISABLE!!! */}
                    {/* <Grid sx={{ textAlign: "center" }} item xs={6} sm={12} md={6} >
                        <InsitutionImage src="/preview-image.png" />
                    </Grid> */}

                    <OportunitiesList institutionId={1} />
                </>

            }
        </Paper>
    )
}

export default InstitutionDetails;
