import { Box } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { api } from '@/api';
import { AuthenticationResponse } from '@/types/authenticate-response';
import { AxiosError, AxiosResponse } from 'axios';
import { apiRoutes } from '@/routes';
import { useQueryClient } from '@tanstack/react-query';

export const GoogleButton = () => {
    const queryClient = useQueryClient()
    const useLoginGoogle = (credentialResponse: CredentialResponse) =>
        api.post<AuthenticationResponse>(apiRoutes.loginGoogle, credentialResponse)
            .then((res: AxiosResponse<AuthenticationResponse>) => {
                toast.success('Bem-vindo ' + res.data.firstName);
                queryClient.invalidateQueries({ queryKey: apiRoutes.getUser } as any);
            }).catch((err: AxiosError) => {
                toast.error("Houve algum erro no login, por favor tente novamente. " + err.message);
            });
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