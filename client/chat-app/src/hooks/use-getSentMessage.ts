import useSWR from 'swr';

// fetch các tin nhắn mà user là người gửi
const fetchSentMessagesByUserId = async (userId: string): Promise<IMessage[]> => {
    const res = await fetch(`https://cloud-computing-chat-app-production.up.railway.app/messages/sent/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch sent messages');
    return await res.json();
};
export function useSentMessages(userId: string) {
    const { data, error, isLoading, mutate } = useSWR<IMessage[]>(
        userId ? `/messages/sent/${userId}` : null,
        () => fetchSentMessagesByUserId(userId)
    );
    return { sent_messages: data, error, isLoading, mutate };
}