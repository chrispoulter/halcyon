import { Metadata } from 'next';
import ChangePasswordContent from './content';

export const metadata: Metadata = {
    title: 'Change Password'
};

export default function ChangePasswordPage() {
    return <ChangePasswordContent />;
}
