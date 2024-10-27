import { Metadata } from 'next';
import ResetPasswordContent from './content';

export const metadata: Metadata = {
    title: 'Reset Password'
};

type ResetPasswordPageProps = {
    params: Promise<{
        token: string;
    }>;
};

export default async function ResetPasswordPage({
    params
}: ResetPasswordPageProps) {
    const { token } = await params;
    return <ResetPasswordContent token={token} />;
}
