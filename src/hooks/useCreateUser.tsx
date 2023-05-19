import useSWRMutation from 'swr/mutation';
import { CreateUserRequest } from '@/models/user.types';
import { fetcher } from '@/utils/fetch';

const createUser = async (url: string, { arg }: { arg: CreateUserRequest }) =>
    fetcher(url, 'POST', arg);

export const useCreateUser = () => {
    const { trigger } = useSWRMutation('/api/user', createUser);

    return { createUser: trigger };
};