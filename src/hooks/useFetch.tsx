import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

export default function useFetch<T extends (...arg: any[]) => any>(fetcher: T, initial: boolean = false) {
    const [loading, setLoading] = useState<boolean>(initial);

    const [data, setData] = useState<ReturnType<typeof fetcher> | null>(null);

    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (initial) {
                try {
                    const newData = await fetcher();
                    setData(newData);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setError(err as AxiosError);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [initial]);

    const reset = () => {
        setData(null);
        setError(null);
    };

    const trigger: (...arg: Parameters<T>) => Promise<Awaited<ReturnType<T>>> = async (...args) => {
        try {
            setError(null);
            setLoading(true);
            const newData = await fetcher(...args);
            setData(newData);
            setLoading(false);
            return newData;
        } catch (err) {
            console.error(err);
            setError(err as AxiosError);
            setLoading(false);
            return null;
        }
    };

    return {
        loading,
        error,
        data,
        trigger,
        reset,
    };
}
