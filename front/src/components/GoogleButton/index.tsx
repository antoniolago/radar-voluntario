import { Box } from '@mui/material';
import { useLoginGoogle } from '@/api/auth';
// import { pageRoutes } from '../routes';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { AuthenticationResponse } from '@/types/authenticate-response';

export const GoogleButton = () => {
    return (
        <Box mb={0}>
            <GoogleLogin
                theme={'outline'}
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    useLoginGoogle(credentialResponse)
                }}
                onError={() => {
                    console.log('Login Failed');
                    toast.error('Invalid details');
                }}
                useOneTap
            />
        </Box>
    );
};

// export default GoogleButton;