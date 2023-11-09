
import { AxiosError, AxiosResponse } from 'axios';
import { apiRoutes } from '@/routes';
import { useApi } from '@/api';
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Opportunity } from '@/types/opportunity';
import { toast } from 'sonner';

const useGetOpportunity = (institution_id: string) => {
  const api = useApi();

  let queryKey: string[] = ['opportunities', institution_id];

  var queryOptions: UseQueryOptions<AxiosResponse<any[]>, Error, AxiosResponse<any[]>, string[]> = {
    queryFn: () => api.get("opportunities/"+institution_id),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: queryKey
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? [] : context.data?.data };
};



const usePostOpportunity = () => {
  const api = useApi();

  return useMutation({
    mutationFn: (opportunityForm: Opportunity) => {
      return api.post('opportunities', opportunityForm)
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      toast.success('Perfil atualizado');
    },
    onError: (error) => {
      toast.error("Houve algum erro ao salvar, por favor tente novamente.");
    },
  });
}

export const OpportunityService = {
  usePostOpportunity,
  useGetOpportunity
}