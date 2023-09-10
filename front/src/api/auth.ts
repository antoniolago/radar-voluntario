import { apiRoutes } from '@/routes';
import { api } from '@/utils/api';
import { useFetch } from '@/utils/reactQuery';
import { User } from '@/types/user';
import { CredentialResponse } from '@react-oauth/google';
import { AuthenticationResponse } from '@/types/authenticate-response';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const useLogin = (email: string, password: string) =>
  api.post<{ token: string }>(apiRoutes.login, {
    email,
    password,
  });

export const useLoginGoogle = (credentialResponse: CredentialResponse) =>
  api.post<AuthenticationResponse>(apiRoutes.loginGoogle, credentialResponse)
    .then((res: AxiosResponse<AuthenticationResponse>) => {
      toast.success('Bem-vindo ' + res.data.firstName);
    }).catch((err: AxiosError) => {
      toast.error("Houve algum erro no login, por favor tente novamente. " +err.message);
    });

export const useGetUser = () => {
  const context = useFetch<User>(
    apiRoutes.getUser,
    undefined,
    { retry: false }
  );
  return { ...context, data: context.data };
};