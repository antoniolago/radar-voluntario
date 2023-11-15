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
    const { isDarkTheme } = React.useContext(TemaContext);
    const { isMobile } = TemaService.useGetIsMobile();
    const [credRes, setCredRes] = React.useState<any>(null);
    const { mutate } = AuthService.useLogin(credRes);
    React.useEffect(() => {
        if(credRes != null)
            mutate();
    }, [credRes])
    return (
        <Box mb={0} mr={2} className="google-auth-button-container">
            <GoogleOAuthProvider clientId={appSettings?.GOOGLE_OAUTH_CLIENT_ID || ""}>
                <GoogleLogin
                    theme={isDarkTheme ? 'filled_black' : 'outline' as any}
                    size="large"
                    type={isMobile ? "icon" : 'standard' as any}
                    shape="rectangular"
                    // width={'10px'}
                    logo_alignment='center'
                    text="signin"
                    onSuccess={credentialResponse => setCredRes(credentialResponse)}
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