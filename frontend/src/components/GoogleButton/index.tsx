import * as React from 'react';
import { Box } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { AuthService } from '@/api/auth';
import { useGetAppSettings } from '@/api/appsettings';
import { TemaContext } from '@/contexts/Tema';
import { TemaService } from '@/api/tema';

export const GoogleButton = () => {
    const { data: appSettings } = useGetAppSettings();
    const { isDarkTheme } = React.useContext(TemaContext)
    const { isMobile } = TemaService.useGetIsMobile();
    return (
        <Box mb={0} mr={2} sx={{
            'iframe': {
                display: 'block',
                position: 'relative',
                top: '0px',
                left: '0px',
                borderRadius: '4px',
                height: '38px',
                width: '218px',
                border: '0px',
                margin: '-2px - 10px',
            }
        }}>
            <GoogleOAuthProvider clientId={appSettings?.GOOGLE_OAUTH_CLIENT_ID || ""}>
                <GoogleLogin
                    theme={isDarkTheme ? 'filled_black' : 'outlined' as any}
                    size="large"
                    type={isMobile ? "icon" : 'standard' as any}
                    shape="square"
                    // width={'10px'}
                    logo_alignment='center'
                    text="signup_with"
                    onSuccess={credentialResponse => AuthService.useLogin(credentialResponse)}
                    onError={() => {
                        console.log('Login Failed');
                        toast.error('Login failed.');
                    }}
                    useOneTap
                />
            </GoogleOAuthProvider>
        </Box >
    );
};

// export default GoogleButton;