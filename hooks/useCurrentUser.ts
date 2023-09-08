// Swr is a React Hooks from fetching data (Similar to react query)
import userSWR from 'swr';

// Fetcher
import fetcher from '@/lib/fetcher';

const useCurrentUser=()=>{
    // The URL sended to the fetcher is the same sended to the hook userSWR
    const {data, error, isLoading, mutate}=userSWR('/api/current', fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export  {useCurrentUser};