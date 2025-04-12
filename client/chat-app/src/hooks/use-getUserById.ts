import useSWR from 'swr';

const fetchUserById = async (id: string): Promise<IUser> => {
    const res = await fetch(`https://cloud-computing-chat-app-production.up.railway.app/user/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    const user: IUser = await res.json();
    return user;
};

export function useUser(userId: string) {
    // Nếu không có userId thì không gọi SWR
    const { data, error, isLoading } = useSWR<IUser>(
        userId ? `/user/${userId}` : null,
        () => fetchUserById(userId)
    );
    return { user: data, error, isLoading };
}