import { useMutation } from '@tanstack/react-query';
import ky from 'ky-universal';
import { ForgotPasswordRequest } from '@/models/account.types';
import { HandlerResponse } from '@/utils/handler';

export const forgotPassword = (json: ForgotPasswordRequest) =>
    ky
        .put('account/forgot-password', { prefixUrl: '/api', json })
        .json<HandlerResponse>();

export const useForgotPassword = () => {
    const { mutateAsync } = useMutation({
        mutationFn: forgotPassword
    });

    return { forgotPassword: mutateAsync };
};
