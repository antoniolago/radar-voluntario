
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
    queryKey:  ['opportunities-'+institution_id]
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? [] : context.data?.data };
};

const useGetOpportunity = (id: string) => {
  const api = useApi();
  const enabled = id == '0' ? false : true;
  var queryOptions: UseQueryOptions<AxiosResponse<Opportunity>, Error, AxiosResponse<Opportunity>, string[]> = {
    queryFn: () => api.get("opportunity/"+id),
    staleTime: Infinity,
    enabled: enabled,
    retryOnMount: false,
    queryKey: ['opportunity-'+id]
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? {} as Opportunity : context.data?.data };
};

const useGetPublishedOpportunity = (id: string) => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<Opportunity>, Error, AxiosResponse<Opportunity>, string[]> = {
    queryFn: () => api.get("opportunity/published/"+id),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: ['publised-opportunity-'+id]
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? {} as Opportunity : context.data?.data };
};

const useGetOpportunityPublishedList = (institution_id: string) => {
  const api = useApi();

  const enabled = institution_id == '0' ? false : true;

  var queryOptions: UseQueryOptions<AxiosResponse<Opportunity[]>, Error, AxiosResponse<Opportunity[]>, string[]> = {
    queryFn: () => api.get("opportunities/published/"+institution_id),
    staleTime: Infinity,
    enabled: enabled,
    queryKey:  ['opportunities-published',institution_id]
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? [] : context.data?.data };
};
//TODO ADJUST QUERIES KEYS

const usePostOpportunity = () => {
  const api = useApi();
  const queryClient = useQueryClient();

 return useMutation({
    mutationFn: async (opportunityForm: Opportunity) => {
      const response = await api.post('/opportunities', opportunityForm);
      return response.data;
    },
    onSuccess: (data: Opportunity) => {
      toast.success('Oportunidade cadastrada');
      queryClient.invalidateQueries(['opportunities-'+data.institution_id])
      return data;
    },
    onError: (error) => {
      toast.error("Houve algum erro ao salvar, por favor tente novamente.");
    },
  });
}

const usePutOpportunity = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (opportunityForm: Opportunity) => {
      return api.put('opportunities/'+opportunityForm.id, opportunityForm)
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['opportunities-'+data.institution_id])
      queryClient.invalidateQueries(['opportunity-'+data.id])
      toast.success('Oportunidade atualizada');
      return data;
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
      toast.success('Oportunidade excluída');
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
  useGetPublishedOpportunity,
  useDeleteOpportunity,
  useGetOpportunityPublishedList
}