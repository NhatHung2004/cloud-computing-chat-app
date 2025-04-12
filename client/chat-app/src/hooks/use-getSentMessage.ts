import useSWR from 'swr';

const fetchMessagesByUserId = async (userId: string): Promise<IMessage[]> => {
    const res = await fetch(`https://cloud-computing-chat-app-production.up.railway.app/messages/sent/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    const sent_messages: IMessage[] = await res.json();
    return sent_messages;
};
export function useSentMessages(userId: string) {
    const { data, error, isLoading } = useSWR<IMessage[]>(
        userId ? `/messages/user/${userId}` : null,
        () => fetchMessagesByUserId(userId)
    );

    return { sent_messages: data, error, isLoading };
}