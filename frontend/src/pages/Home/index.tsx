import MapComponent from '@/components/MapComponent';
import Oportunidades from '@/components/OpportunitiesList';
import { Typography } from '@mui/material';

function Home() {
    return (
        <>
            <div style={{ textAlign: 'center', margin:"2rem 0 3rem 0" }}>
                <Typography variant="h3" component="h1" fontWeight="600">Radar Voluntário</Typography>
                <Typography variant="h6" component="p">
                    Encontre oportunidades próximas a você
                </Typography>
            </div>
            <MapComponent />
            <Oportunidades/>
        </>
    )
}

export default Home
