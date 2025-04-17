import useSWR from 'swr';
import { Apis, MESSAGE_ENDPOINTS } from '@/configs/Apis';

// fetch các tin nhắn mà user là người gửi
const fetchSentMessagesByUserId = async (userId: string): Promise<IMessage[]> => {
    const res = await Apis.get(`/messages/sent/${userId}`);
    return res.data;
};
export function useSentMessages(userId: string) {
    const { data, error, isLoading, mutate } = useSWR<IMessage[]>(
        userId ? MESSAGE_ENDPOINTS.sent(userId) : null,
        () => fetchSentMessagesByUserId(userId)
    );
    return { sent_messages: data, error, isLoading, mutate };
}