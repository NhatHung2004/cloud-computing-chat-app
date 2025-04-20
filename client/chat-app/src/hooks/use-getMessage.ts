'use client';

import useSWR from 'swr';
import { Apis, MESSAGE_ENDPOINTS } from '@/configs/Apis';

// fetch các tin nhắn mà user là người nhận
const fetchReceivedMessagesByUserId = async (userId: string): Promise<IMessage[]> => {
    const res = await Apis.get(MESSAGE_ENDPOINTS.received(userId));
    return res.data;
};
export function useMessages(userId: string) {
    const { data, error, isLoading, mutate } = useSWR<IMessage[]>(
        userId ? MESSAGE_ENDPOINTS.received(userId) : null,
        () => fetchReceivedMessagesByUserId(userId)
    );
    return { messages: data, error, isLoading, mutate };
}
