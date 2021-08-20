import useSWR from 'swr';
import API from './index';

export const useSearchProduct = ( name, options= {} ) => {
    const { data, error } = useSWR( `/product/${ name }`, API.fetcher, options );

    return {
        searchProduct: data && data.data,
        isLoading: !error && !data,
        isError: error
    };
};
