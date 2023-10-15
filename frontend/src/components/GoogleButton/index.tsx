import * as React from 'react';
import { Box } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { AuthService } from '@/api/auth';
import { useGetAppSettings } from '@/api/appsettings';

export const GoogleButton = () => {
    const { data: appSettings } = useGetAppSettings();
    return (
        <Box mb={0}>
            <GoogleOAuthProvider clientId={appSettings?.GOOGLE_OAUTH_CLIENT_ID || ""}>
                <GoogleLogin
                    theme={'outline'}
                    onSuccess={credentialResponse => AuthService.useLogin(credentialResponse)}
                    onError={() => {
                        console.log('Login Failed');
                        toast.error('Login failed.');
                    }}
                    useOneTap
                />
            </GoogleOAuthProvider>
        </Box>
    );
};

// export default GoogleButton;