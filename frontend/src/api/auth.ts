import { apiRoutes } from '@/routes';
import { setToken, useApi } from '@/api';
import { User } from '@/types/user';
import { AxiosError, AxiosResponse } from 'axios';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthenticationResponse } from '@/types/authenticate-response';
import { CredentialResponse } from '@react-oauth/google';
import { toast } from 'sonner';

export const useLogin = (credentialResponse: CredentialResponse) => {
  const api = useApi();
  api.post<AuthenticationResponse>(apiRoutes.loginGoogle, credentialResponse)
    .then((res: AxiosResponse<AuthenticationResponse>) => {
      setToken(res.data.token);
      toast.success('Bem-vindo ' + res.data.user.name);
    }).catch((err: AxiosError) => {
      toast.error("Houve algum erro no login, por favor tente novamente. " + err.message);
    });
}

export const useGetUser = () => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<User>, Error, AxiosResponse<User>, string[]> = {
    retry: false,
    queryFn: () => api.get("user"),
    staleTime: Infinity,
    enabled: true,
    queryKey: ['user']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data };
};

export const AuthService = {
  useLogin,
  useGetUser
}