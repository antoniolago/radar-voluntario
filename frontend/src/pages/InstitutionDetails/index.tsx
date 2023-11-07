import OportunitiesList from '@/components/OpportunitiesList';
import { Grid, Typography } from '@mui/material';
import BackButton from '@/components/BackButton';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/styles/styles';
import { InsitutionImage, SocialMedialList } from './styles';
import facebookLogo from '../../assets/facebook.svg';
import instagramLogo from '../../assets/instagram.svg';

function InstitutionDetails() {
    const { id } = useParams();

    const institution = {
        name: 'Nome organização',
        description: 'Sobre a organização. Lorem ipsum dolor sit amet. Ut magni debitis sit veniam enim sed adipisci vitae sit enim alias qui voluptatem eligendi ea eaque accusamus! Et facere tenetur ab esse asperiores et iste doloribus sit eius quaerat aut eaque ullam et ducimus illo quo adipisci quia. Sit maiores voluptatum et vitae quaerat ut Quis voluptatem qui illo maiores sed provident aliquid quo voluptatibus nisi At animi culpa.',
        instagram: 'https://www.instagram.com/s',
        facebook: 'https://www.facebook.com/s'
    }

    return (
        <PageContainer>
            <BackButton redirectTo='/' />
            <Typography sx={{ textAlign: "center" }} mb={4} variant="h5" component="h2"> {institution.name} {id}</Typography>
            <Typography sx={{ textAlign: "justify" }} mb={4} variant="body1" component="p"> {institution.description} </Typography>

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

            <Grid sx={{ textAlign: "center" }} item xs={6} sm={12} md={6} >
                <InsitutionImage src="/preview-image.png" />
            </Grid>

            <OportunitiesList institutionId={1} />

        </PageContainer>
    )
}

export default InstitutionDetails;
