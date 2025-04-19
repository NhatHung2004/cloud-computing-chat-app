import useSWR from 'swr';

const fetchAllUsers = async (): Promise<IUser[]> => {
    const res = await fetch(`https://cloud-computing-chat-app-production.up.railway.app/user`);
    if (!res.ok) throw new Error('Failed to fetch users');
    const users: IUser[] = await res.json();
    return users;
};

export function useAllUsers() {
    const { data, error, isLoading } = useSWR<IUser[]>(
        '/users', // key để cache
        fetchAllUsers
    );

    return { users: data, error, isLoading };
}