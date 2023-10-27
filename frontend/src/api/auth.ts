import { apiRoutes } from '@/routes';
import { setToken, useApi } from '@/api';
import { User } from '@/types/user';
import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthenticationResponse } from '@/types/authenticate-response';
import { CredentialResponse } from '@react-oauth/google';
import { toast } from 'sonner';

const useLogin = (credentialResponse: CredentialResponse) => {
  const api = useApi();
  const queryClient = useQueryClient()

  var mutationOptions: UseMutationOptions = {
    mutationFn: () => api.post<AuthenticationResponse>(apiRoutes.loginGoogle, credentialResponse)
      .then((res: AxiosResponse<AuthenticationResponse>) => {
        setToken(res.data.token);
        toast.success('Bem-vindo ' + res.data.user.name);
        queryClient.invalidateQueries(["user"])
      }).catch((err: AxiosError) => {
        toast.error("Houve algum erro no login, por favor tente novamente. " + err.message);
      })
  };
  return useMutation(mutationOptions)

}

const useGetUser = () => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<User>, Error, AxiosResponse<User>, string[]> = {
    retry: false,
    queryFn: () => api.get("account"),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: ['user']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data };
};

export const AuthService = {
  useLogin,
  useGetUser
}