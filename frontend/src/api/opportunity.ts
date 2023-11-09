
import { AxiosError, AxiosResponse } from 'axios';
import { apiRoutes } from '@/routes';
import { useApi } from '@/api';
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Opportunity } from '@/types/opportunity';
import { toast } from 'sonner';

const useGetOpportunityList = (institution_id: string) => {
  const api = useApi();

  const enabled = institution_id == '0' ? false : true;

  var queryOptions: UseQueryOptions<AxiosResponse<Opportunity[]>, Error, AxiosResponse<Opportunity[]>, string[]> = {
    queryFn: () => api.get("opportunities/"+institution_id),
    staleTime: Infinity,
    enabled: enabled,
    retryOnMount: true,
    queryKey:  ['opportunities']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? [] : context.data?.data };
};

const useGetOpportunity = (id: string) => {
  const api = useApi();

  let queryKey: string[] = ['opportunities', id];

  var queryOptions: UseQueryOptions<AxiosResponse<Opportunity>, Error, AxiosResponse<Opportunity>, string[]> = {
    queryFn: () => api.get("opportunity/"+id),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: ['opportunity-'+id]
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? {} as Opportunity : context.data?.data };
};


const usePostOpportunity = () => {
  const api = useApi();

  return useMutation({
    mutationFn: (opportunityForm: Opportunity) => {
      return api.post('opportunities', opportunityForm)
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      // navigate('/edicao/oportunidade/'+data.id)
      toast.success('Oportunidade cadastrada');
    },
    onError: (error) => {
      toast.error("Houve algum erro ao salvar, por favor tente novamente.");
    },
  });
}

//set query data

const usePutOpportunity = (id: string) => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opportunityForm: Opportunity) => {
      return api.put('opportunities/'+id, opportunityForm)
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['opportunities'])
      queryClient.invalidateQueries(['opportunity-'+data.id])
      toast.success('Oportunidade atualizada');
    },
    onError: (error) => {
      toast.error("Houve algum erro ao salvar, por favor tente novamente.");
    },
  });
}

const useDeleteOpportunity = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await api.delete('opportunities/' + id)
      .then((response) => response);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['opportunities'])
      queryClient.invalidateQueries({
        queryKey: ['opportunities']
      })
      toast.success('Oportunidade excluída');
      return data;
    },
    onError: (error) => {
      toast.error("Houve algum erro ao exclurr, por favor tente novamente.");
    },
  });
}
export const OpportunityService = {
  usePostOpportunity,
  usePutOpportunity,
  useGetOpportunityList,
  useGetOpportunity,
  useDeleteOpportunity
}