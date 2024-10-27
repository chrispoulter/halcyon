import { Metadata } from 'next';
import ForgotPasswordContent from './content';

export const metadata: Metadata = {
    title: 'Forgot Password'
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordContent />;
}
