import MapComponent from '@/components/MapComponent';
import OportunitiesList from '@/components/OpportunitiesList';
import { Typography } from '@mui/material';
import Box from '@mui/joy/Box/Box';
import { useEffect } from 'react';

function Home() {
    return (
        <>
            <Box sx={{width: '100%', height: '100%', padding:'0 2rem'}}>
                <div style={{ textAlign: 'center', margin:"2rem 0 3rem 0" }}>
                    <Typography variant="h3" component="h1" fontWeight="600">Radar Voluntário</Typography>
                    <Typography variant="h6" component="p">
                        Encontre oportunidades próximas a você
                    </Typography>
                </div>
                <MapComponent />
                <OportunitiesList/>
            </Box>
        </>
    )
}

export default Home;
