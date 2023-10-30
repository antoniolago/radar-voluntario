import OportunitiesList from '@/components/OpportunitiesList';
import { Grid, Typography } from '@mui/material';
import BackButton from '@/components/BackButton';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/styles/styles';
import facebookLogo from '../../assets/facebook.svg';
import instagramLogo from '../../assets/instagram.svg';

function Institutions() {
    const { id } = useParams();

    const institution = {
        name: 'Nome organização',
        description: 'Sobre a organização. Lorem ipsum dolor sit amet. Ut magni debitis sit veniam enim sed adipisci vitae sit enim alias qui voluptatem eligendi ea eaque accusamus! Et facere tenetur ab esse asperiores et iste doloribus sit eius quaerat aut eaque ullam et ducimus illo quo adipisci quia. Sit maiores voluptatum et vitae quaerat ut Quis voluptatem qui illo maiores sed provident aliquid quo voluptatibus nisi At animi culpa.',
        instagram: 'https://www.instagram.com/s',
        facebook: 'https://www.facebook.com/s'
    }

    return (
        <>
            <BackButton redirectTo='/' />
            <Grid mb={10} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={12} md={6} >
                    <Typography sx={{ textAlign: "center" }} mb={4} variant="h5" component="h2"> {institution.name} {id}</Typography>
                    <Typography sx={{ textAlign: "justify" }} mb={4} variant="body1" component="p"> {institution.description} </Typography>


                </Grid>
            </Grid>

            <OportunitiesList institutionId={1} />

        </>
    )
}

export default Institutions;
