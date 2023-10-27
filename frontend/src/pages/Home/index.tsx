import MapComponent from '@/components/MapComponent';
import Box from '@mui/joy/Box/Box';
import { useEffect } from 'react';

function Home() {
    
    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <MapComponent />
        </Box>
    )
}

export default Home