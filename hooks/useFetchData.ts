// Swr is a React Hooks from fetching data (Similar to react query)
import userSWR from 'swr';

// Fetcher
import fetcher from '@/lib/fetcher';

interface optionsSWR {
    revalidateOnFocus?: boolean,
    revalidateOnReconnect?: boolean,
    revalidateIfStale?: boolean,
}

const useFetchData=(URI: string, options?:optionsSWR)=>{
    // The URL sended to the fetcher is the same sended to the hook userSWR
    const {data, error, isLoading, mutate}=userSWR(URI, fetcher, options)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export { useFetchData };