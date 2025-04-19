'use client';

import useSWR from 'swr';
import { Apis, USER_ENDPOINTS } from '@/configs/Apis';

const fetchUserById = async (id: string): Promise<IUser> => {
    const res = await Apis.get(USER_ENDPOINTS.byId(id));
    return res.data;
};

export function useUser(userId: string) {
    // Nếu không có userId thì không gọi SWR
    const { data, error, isLoading } = useSWR<IUser>(
        userId ? USER_ENDPOINTS.byId(userId) : null,
        () => fetchUserById(userId)
    );
    return { user: data, error, isLoading };
}