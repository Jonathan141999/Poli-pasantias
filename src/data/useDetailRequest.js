import useSWR from 'swr';
import API from './index';

export const useDetailRequest = ( id, options= {} ) => {
    const { data, error, mutate } = useSWR( `/requests/${ id }/details`, API.fetcher, options );

    return {
        detailRequest: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
