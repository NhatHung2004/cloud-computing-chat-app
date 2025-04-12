import useSWR from 'swr';

const fetchMessagesByUserId = async (userId: string): Promise<IMessage[]> => {
    const res = await fetch(`https://cloud-computing-chat-app-production.up.railway.app/messages/user/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    const messages: IMessage[] = await res.json();
    return messages;
};
export function useMessages(userId: string) {
    const { data, error, isLoading } = useSWR<IMessage[]>(
        userId ? `/messages/user/${userId}` : null,
        () => fetchMessagesByUserId(userId)
    );

    return { messages: data, error, isLoading };
}