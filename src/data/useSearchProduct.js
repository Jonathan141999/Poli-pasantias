import useSWR from 'swr';
import API from './index';

export const useSearchProduct = ( id, options= {} ) => {
    const { data, error } = useSWR( `/publication/${id}`, API.fetcher, options );

    return {
        searchProduct: data && data.data,
        isLoading: !error && !data,
        isError: error
    };
};
