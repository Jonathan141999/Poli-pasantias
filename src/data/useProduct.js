import useSWR from 'swr';
import API from './index';

export const useProduct = ( id, options= {} ) => {
    const { data, error } = useSWR( `/products/${ id }`, API.fetcher, options );

    return {
        product: data && data.data,
        isLoading: !error && !data,
        isError: error
    };
};
