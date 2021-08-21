import useSWR from 'swr';
import API from './index';

export const useRequestsByUser = () => {
    const {data, error, mutate} = useSWR('/postulation/user', API.fetcher);

    return{
        requestsByUser: data && data.data ,
        isLoadingRequests: !data && !error,
        isErrorRequests: error,
        mutate
    }
}


