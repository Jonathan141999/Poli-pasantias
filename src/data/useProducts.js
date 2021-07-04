import useSWR from 'swr';
import API from './index';
export  const useProducts = () => {
    const {data, error, mutate}= useSWR ('/products', API.fetcher);

    return {
        products: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
