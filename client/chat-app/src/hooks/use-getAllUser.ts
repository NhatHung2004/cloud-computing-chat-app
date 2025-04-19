'use client';

import useSWR from 'swr';
import { Apis, USER_ENDPOINTS } from '@/configs/Apis';

const fetchAllUsers = async (): Promise<IUser[]> => {
    const res = await Apis.get(USER_ENDPOINTS.all);
    return res.data;
};

export function useAllUsers() {
    const { data, error, isLoading } = useSWR<IUser[]>(
        USER_ENDPOINTS.all, // key để cache
        fetchAllUsers
    );

    return { users: data, error, isLoading };
}