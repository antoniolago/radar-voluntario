import MapComponent from '@/components/MapComponent';
import Box from '@mui/joy/Box/Box';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        window.scrollTo(0, 1);
    }, [])
    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <MapComponent />
        </Box>
    )
}

export default Home
