import useSWR from 'swr';
import API from './index';
export  const useRequests = () => {
    const {data, error, mutate}= useSWR ('/requests', API.fetcher);

    return {
        requests: data && data.data,
        isLoadingRequest: !error && !data,
        isErrorRequest: error,
        mutate
    };
};
