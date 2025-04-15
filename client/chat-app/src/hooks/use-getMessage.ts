import useSWR from 'swr';

// fetch các tin nhắn mà user là người nhận
const fetchReceivedMessagesByUserId = async (userId: string): Promise<IMessage[]> => {
    const res = await fetch(`https://cloud-computing-chat-app-production.up.railway.app/messages/user/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch received messages');
    return await res.json();
};
export function useMessages(userId: string) {
    const { data, error, isLoading, mutate } = useSWR<IMessage[]>(
        userId ? `/messages/user/${userId}` : null,
        () => fetchReceivedMessagesByUserId(userId)
    );
    return { messages: data, error, isLoading, mutate };
}
