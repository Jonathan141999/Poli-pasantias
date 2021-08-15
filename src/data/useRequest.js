import useSWR from 'swr';
import API from './index';

export const useRequest = ( id, options= {} ) => {
    const { data, error, mutate } = useSWR( `/postulations/${ id }`, API.fetcher, options );

    return {
        request: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
