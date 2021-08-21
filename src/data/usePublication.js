import useSWR from 'swr';
import API from './index';
export  const usePublication = () => {
    const {data, error, mutate}= useSWR ('/publications/forstudents', API.fetcher);

    return {
        products: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};