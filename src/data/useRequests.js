import useSWR from 'swr';
import API from './index';
export  const useRequests = () => {
    const {data, error, mutate}= useSWR ('/postulations', API.fetcher);

    return {
        requests: data && data.data,
        isLoadingRequest: !error && !data,
        isErrorRequest: error,
        mutate
    };
};
